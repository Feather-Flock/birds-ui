import React, { useState, useContext } from 'react'
import './EventModal.css'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENT_BY_ID, USER_RSVP_TO_EVENT, USER_DELETE_RSVP } from "../../queries";
import UserContext from "../../Context/UserContext"
import LoadingPage from '../LoadingPage/LoadingPage';

const dayjs = require('dayjs')

Modal.setAppElement('#root');

function EventModal({userId, eventId, isRsvpd, visible, handleClose}) {

  const user = useContext(UserContext)

  const {loading, error, data} = useQuery(GET_EVENT_BY_ID, {
    variables: {"id": parseInt(eventId)}
  })

  const [rsvpd, setRsvpd] = useState(isRsvpd)
  const [modalIsOpen, setIsOpen] = useState(visible);

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    handleClose()
  }

  const [mutateCreateRsvp, createdResponse] = useMutation(USER_RSVP_TO_EVENT, {
    variables: { input: { userId: parseInt(userId), eventId: parseInt(eventId) }}
  })

  const [mutateDeleteRsvp, deletedResponse] = useMutation(USER_DELETE_RSVP, {
    variables: { input: {userId: parseInt(userId), eventId: parseInt(eventId) }}
  })

  const createRsvp = (e) => {
    mutateCreateRsvp()
    if(!createdResponse.error) {
      setRsvpd(true)
    }
  }

  const deleteRsvp = (e) => {
    mutateDeleteRsvp()
    if(!deletedResponse.error) {
      setRsvpd(false)
    }
  }
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0, 
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, .7)',
      zIndex: 1000
    },
    content: {
      position: 'fixed',
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      zIndex: 1000
    },
  };

  const renderButtons = () => {
    return (
      <>
        {rsvpd ?
          <button className="modal-button" onClick={(e) => deleteRsvp(e)}> Cancel RSVP</button>
        :
          <button className="modal-button" onClick={(e) => createRsvp(e)}> RSVP!</button>
        }
        <button className="modal-button">
          <Link to={{pathname:'/profile', state:{hostId: data.event.creator.id}}} className="modal-button link" role="button" onClick={closeModal}>
            View Family Profile
          </Link>
        </button>
      </>
    )
  }

  if(loading) return <LoadingPage />
  if(error) return `Error! ${error.message}`

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modal id='event'
      className='event-modal'
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}>
        <button onClick={closeModal}
        className='close-button'>X</button>
        <h1 className='modal-header'>{data.event.title}</h1>
        <div className='modal-grid'>
          <div className="left-container">
            <br/>
            <p className='date'>{data.event.date}</p>
            <p className='time'>{dayjs(`${data.event.date} ${data.event.time}`).format('h:mm a')}</p>
            <p className='location'>{data.event.address}</p>
            <p className='event-description'>{data.event.description}</p>
          </div>
          <div>
            <h1>The {data.event.creator.userName} Family </h1>
            <img className='event-img' src={data.event.creator.image} alt="event"/>
            <br/>
            {user.id !== data.event.creator.id && renderButtons()
            }
            <br/>
            <a href={`http://MapQuest.com/${data.event.slug}`}>
            <button className='modal-button'>Get Directions</button></a>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EventModal

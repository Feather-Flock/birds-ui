import React, { useState, useContext } from 'react'
import './EventModal.css'
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENT_BY_ID, USER_RSVP_TO_EVENT, USER_DELETE_RSVP } from "../../queries";
import UserContext from "../../Context/UserContext"

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

  const getDirections = () => {
    console.log('Insert url link here')
    //insert navigationlink to directions
  }

  const [mutateCreateRsvp, createdResponse] = useMutation(USER_RSVP_TO_EVENT, {
    variables: { input: { userId: parseInt(userId), eventId: parseInt(eventId) }}
  })

  const [mutateDeleteRsvp, deletedResponse] = useMutation(USER_DELETE_RSVP, {
    variables: { input: {userId: userId, eventId: eventId }}
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
    content: {
      zindex: 1,
      position: 'fixed',
      right: 'auto',
      marginLeft: '10%',
      bottom: 'auto',
    },
  };

  const renderButtons = () => {
    return (
      <>
        {rsvpd ?
          <button onClick={(e) => deleteRsvp(e)}> Cancel RSVP</button>
        :
          <button onClick={(e) => createRsvp(e)}> RSVP!</button>
        }
        <Link to={{pathname:'/profile', state:{hostId: data.event.creator.id}}} onClick={closeModal}>
          <button>View Family Profile</button>
        </Link> 
      </>
    )
  }

  if(loading) return "Loading..."
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
        <div>
          <br/>
          <h3>{`${data.event.date}  ${data.event.time}`}</h3>
          <img className='event-img' src='https://www.illustrationsof.com/royalty-free-rf-art-museum-clipart-illustration-by-nl-shop-stock-sample-432030.jpg'></img>
          <p>Location: {data.event.address}</p>
          <p className='event-description'>{data.event.description}</p>
          <p className='total-rsvps'>Total RSVPs for this event: {data.event.rsvps}</p>
        </div>
        <div>
          <h1>{data.event.creator.userName}</h1>
          <img className='event-img' src={data.event.creator.image}/>
          <br/>
          {user.id !== data.event.creator.id && renderButtons()
          }
          <div className='event-modal-map'>
            <h1>Map</h1>
          </div>
          <button onClick={getDirections}>Get Directions</button>
        </div>
      </div>
    </Modal>
    </>
  )
}

export default EventModal

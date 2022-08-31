import React, {useState } from 'react'
import './EventModal.css'
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function EventModal({eventInfo}) {

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const getDirections = () => {
    console.log('Insert url link here')
    //insert navigationlink to directions 
  }

  const customStyles = {
  content: {
    position: 'fixed',
    right: 'auto',
    marginLeft: '10%',
    bottom: 'auto',
  },
};

  const event = {familyName: 'The Waterbills',
  familyID: 3,
  date: 'September 10,',
  time: '2:00pm-4:00pm',
  address: 'The Art Museum',
  title:'A Trip To the Art Museum',
  description: 'We want to take our daughter to the new Frida Kahlo exhibit and would love if you would join us!',
  familyTags: ['mlm', '1 kid', 'daughter', 'gay', 'tween']}
//remove above once bringing in data from destructured info
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
      <div className='modal-grid'>
        <div>
          <h1>{event.title}</h1>
          <h3>{`${event.date}  ${event.time}`}</h3>
          <img className='event-img' src='https://www.illustrationsof.com/royalty-free-rf-art-museum-clipart-illustration-by-nl-shop-stock-sample-432030.jpg'></img>
          <p>Location: {event.address}</p>
          <p className='event-description'>{event.description}</p>
        </div>
        <div>
          <h1>{event.familyName}</h1>
          <img className='event-img' src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Males_Anas_platyrhynchos_2.jpg'/>
          <br/>
          <button> RSVP!</button>
          <br/>
          <button onClick={useNavigate('/familyProfile/3')}>View Family Profile</button>
          //Add a dynamic link to family here
          <button onClick={getDirections}>Get Directions</button>
        </div>
      </div>
    </Modal>
    </>
  )
}

export default EventModal

import React from 'react'
import './EventModal.css'

function EventModal({eventInfo}) {

  const event = {familyName: 'The Waterbills',
  familyID: 3,
  date: 'September 10,',
  time: '2:00pm-4:00pm',
  location: 'The Art Museum',
  title:'A Trip To the Art Museum',
  description: 'We want to take our daughter to the new Frida Kahlo exhibit and would love if you would join us!',
  familyTags: ['mlm', '1 kid', 'daughter', 'gay', 'tween']}

  return (
    <div className='event-modal'>
      <button className='close-button'>X</button>
      <div className='modal-grid'>
        <div>
          <h1>{event.title}</h1>
          <h3>{`${event.date}  ${event.time}`}</h3>
          <img className='event-img' src='https://www.illustrationsof.com/royalty-free-rf-art-museum-clipart-illustration-by-nl-shop-stock-sample-432030.jpg'></img>
          <p>Location: {event.location}</p>
          <p className='event-description'>{event.description}</p>
        </div>
        <div>
          <h1>{event.familyName}</h1>
          <img className='event-img' src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Males_Anas_platyrhynchos_2.jpg'/>
          <br/>
          <button> RSVP!</button>
          <br/>
          <button>View Family Profile</button>
        </div>
      </div>
    </div>
  )
}

export default EventModal

import React from 'react'
import './EventModal.css'

function EventModal({eventInfo}) {

  const event = {familyName: 'The Waterbills',
  familyID: 3,
  date: '09/10/2022',
  time: '2:00pm-4:00pm',
  location: 'The Art Museum',
  title:'A Trip To the Art Museum',
  description: 'We want to take our daughter to the new Frida Kahlo exhibit and would love if you would join us!',
  familyTags: ['mlm', '1 kid', 'daughter', 'gay', 'tween']}

  return (
    <div className='event-modal'>
      <h1>{event.title}</h1>
      <button className='close-button'>X</button>
      <div>
        <h3>{event.date}</h3>
        <h3>{event.time}</h3>
        <img className='event-img' src='https://www.illustrationsof.com/royalty-free-rf-art-museum-clipart-illustration-by-nl-shop-stock-sample-432030.jpg'></img>
        <p>{event.description}</p>
        <p>{event.location}</p>
      </div>
      <div>
        <h1>{event.familyName}</h1>
        <img className='event-img' src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Males_Anas_platyrhynchos_2.jpg'/>
      </div>
    </div>
  )
}

export default EventModal

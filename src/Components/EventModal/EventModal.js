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
    <div>
      <h1>{event.title}</h1>
      <h3>{event.date}</h3>
      <h3>{event.time}</h3>
      <img src='https://dribbble.com/tags/museum_illustration'></img>
      <p>{event.description}</p>
      <p>{event.location}</p>
    </div>
  )
}

export default EventModal

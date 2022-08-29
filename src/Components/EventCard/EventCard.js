import React from 'react'
import "./EventCard.css"

const EventCard = ({id, title, description, date, time}) => {
  return (
    <div className="event-card">
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{time}</p>
    </div>
  )
}

export default EventCard
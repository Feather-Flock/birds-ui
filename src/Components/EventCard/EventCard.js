import React from 'react'
import "./EventCard.css"

const EventCard = ({id, title, description, date, time, type}) => {
  if(type === "card") {
    return (
      <div className="event-card">
        <h2>{title}</h2>
        <p>{date}</p>
        <p>{time}</p>
      </div>
    )
  } else if (type === "list") {
    return (
      <div className="event-list-item">
        <h2>{title}</h2>
        <p>{date}</p>
        <p>{time}</p>
      </div>
    )
  }
}

export default EventCard
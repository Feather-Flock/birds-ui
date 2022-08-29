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
        <div className="date-container">
          <p className="event-date">date: {date}</p>
        </div>
        <div className="time-container">
          <p className="event-time">{time}</p>
        </div>
        <div className="title-container">
          <h2 className="event-title">{title}</h2>
        </div>
      </div>
    )
  }
}

export default EventCard
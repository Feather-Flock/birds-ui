import React from 'react'
import "./EventCard.css"

const EventCard = ({id, title, description, date, time, type, handleClick}) => {
  if(type === "card") {
    return (
      <div onClick={handleClick} id={id} className="event-card">
        <h2 id={id}>{title}</h2>
        <p>{date}</p>
        <p>{time}</p>
      </div>
    )
  } else if (type === "list") {
    return (
      <div onClick={handleClick} id={id} className="event-list-item">
        <div id={id} className="date-container">
          <p className="event-date">date: {date}</p>
        </div>
        <div id={id} className="time-container">
          <p id={id} className="event-time">{time}</p>
        </div>
        <div id={id} className="title-container">
          <h2 className="event-title">{title}</h2>
        </div>
      </div>
    )
  }
}

export default EventCard

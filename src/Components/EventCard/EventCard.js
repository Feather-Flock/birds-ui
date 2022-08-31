import React from 'react'
import "./EventCard.css"

const EventCard = ({ id, title, description, date, time, type, handleClick }) => {
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
      <div className="event-container">
        <h2 className="attending-header">Upcoming</h2>

        <div className="event-picture-wrapper">
          <img className="event-picture" alt="event festivities"></img>
        </div>

        <div className="event-info-container" >
          <div className="event-details">
            <p className="title">What: {title}</p>
            <p className="date">When: {date}</p>
            <p className="time">Time: {time}</p>
          </div>
          <p className="description">{description}</p>
        </div>

          <button className="view-details-button" onClick={handleClick}>View Details</button>
      </div>
    )
  }
}

export default EventCard

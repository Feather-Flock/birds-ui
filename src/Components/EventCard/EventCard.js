import React from 'react'
import "./EventCard.css"
import { BsTrash } from 'react-icons/bs'
import { IconContext } from "react-icons";

const EventCard = ({ id, title, description, date, time, eventTitle, type, handleClick, deleteClick, userEvent }) => {
  if(type === "card") {
    return (
      <div className="event-container">
        <h2 className="attending-header">{eventTitle}</h2>
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
        <div className="event-buttons">
          {userEvent &&
            <div className="delete-event">
              <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                <button id={id} className="delete-button" onClick={() => deleteClick(id)}><BsTrash/></button>
              </IconContext.Provider>
            </div>
          }
        <button id={id} className="view-details-button" onClick={handleClick}>View Details</button>
        </div>
      </div>
    )
  } else if (type === "list") {
    return (
      <div className="event-container">
        <h2 className="upcoming-header">{eventTitle}</h2>

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

          <button id={id} className="view-details-button" onClick={handleClick}>View Details</button>
      </div>
    )
  }
}

export default EventCard

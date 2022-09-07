import React from 'react'
import "./EventCard.scss"
import { BsTrash } from 'react-icons/bs'
import { IconContext } from "react-icons";

const EventCard = ({ id, hostImage, title, description, date, time, eventTitle, type, handleClick, deleteClick, userEvent }) => {
  if(type === "card") {
    return (
      <div className="event-container">
        <h2 className="attending-header">{eventTitle}</h2>
        <div className="event-info-container" >
          <div className="event-details">
            <p className="title">What: {title}</p>
            <p className="date">When: {date}</p>
            <p className="time">Time: {time}</p>
          </div>
        </div>
        <div id={id} className="event-buttons">
          <button className="view-details-button" id={id} onClick={handleClick}>
            View Details
            <div id={id} className="view-details-button__horizontal"></div>
            <div id={id} className="view-details-button__vertical"></div>
          </button>
        </div>
        {userEvent &&
            <div className="delete-event">
              <IconContext.Provider value={{ color: 'black', size: '20px' }}>
                <button id={id} className="delete-button" onClick={() => deleteClick(id)}><BsTrash/></button>
              </IconContext.Provider>
            </div>
          }
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
        </div>
        <button className="view-details-button" id={id} onClick={handleClick}>
            View Details
            <div className="view-details-button__horizontal"></div>
            <div className="view-details-button__vertical"></div>
          </button>
      </div>
    )
  }
}

export default EventCard

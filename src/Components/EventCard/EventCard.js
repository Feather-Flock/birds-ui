import React, { useContext } from 'react'
import "./EventCard.scss"
import { BsTrash } from 'react-icons/bs'
import { IconContext } from "react-icons";
import UserContext from '../../Context/UserContext';

const EventCard = ({ id, title, host, date, time, eventTitle, type, handleClick, deleteClick, userEvent }) => {
  const user = useContext(UserContext)

  const addDelete = () => {
    if(userEvent && host == user.id) {
      return (
        <div className="delete-event">
          <IconContext.Provider value={{ color: 'black', size: '20px' }}>
            <button id={id} className="delete-button" onClick={() => deleteClick(id)}><BsTrash/></button>
          </IconContext.Provider>            
        </div>
      )
    }
  }

  if(type === "card") {
    return (
      <div className="event-container">
        <h2 className="attending-header">{eventTitle}</h2>
        <div className="event-info-container" >
          <div className="event-details">
            <p className="title">What: {title}</p>
            <p className="date">{date}</p>
            <p className="time">{time}</p>
          </div>
        </div>
        <div id={id} className="event-buttons">
          <button className="view-details-button" id={id} onClick={handleClick}>
            View Details
            <div id={id} className="view-details-button__horizontal"></div>
            <div id={id} className="view-details-button__vertical"></div>
          </button>
        </div>
        {addDelete()}
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
            <p className="date">{date}</p>
            <p className="time">{time}</p>
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

import React, { useState, useContext } from 'react'
import "./DashboardList.css"
import Events from "../Events/Events"
import EventModal from '../EventModal/EventModal'
import UserContext from '../../Context/UserContext';
import SelectDropdown from '../SelectDropdown/SelectDropdown';



const DashboardList = ({refetch, handleSelect, range}) => {
  
  const user = useContext(UserContext)

  const [modalVisible, setModalVisible] = useState(false)
  const [eventId, setEventId] = useState()
  const handleClick = (e) => {
    const {id} = e.target
    setEventId(id)
    setModalVisible(true)
  }

  const closeModal = () => {
    setEventId(null)
    setModalVisible(false)
    refetch()
  }

  const rsvpd = () => {
    const eventFound = user.rsvpdEvents.find(ev => ev.id === eventId)
    return eventFound ? true : false
  }

  return (
    <div className="dashboardList-container">
      <h1 className="welcome-user">Welcome {user.userName}!</h1>
      <div className="top-list-container">
        <div className="select-list-dropdown"></div>
        <div className="select-list-dropdown">
          <SelectDropdown handleSelect={handleSelect} range={range} />
        </div>
        
      </div>
      <div className="main-container">

        <div className="event-list-rsvp">
          <Events events={user.rsvpdEvents} eventTitle={"Event you're Attending"} type={"card"} handleClick={handleClick}/>
        </div>

        <div className="event-list-user">
          <Events events={user.userDefined} eventTitle={"Event Near You"} type={"card"} handleClick={handleClick} />
        </div>

      </div>
        {modalVisible && <EventModal userId={user.id} eventId={eventId} visible={modalVisible} handleClose={closeModal} isRsvpd={rsvpd()} />}
    </div>
  )
}

export default DashboardList

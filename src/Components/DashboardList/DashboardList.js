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
      <div className="main-container">
        <div className="event-list-rsvp">
          <h1 className="welcome-user">Welcome back, {user.userName}!</h1>
          <Events events={user.rsvpdEvents} eventTitle={"Event You're Attending"} type={"card"} handleClick={handleClick}/>
        </div>
        <div className="event-list-user">
          <div className="select-list-dropdown">
            <SelectDropdown handleSelect={handleSelect} range={range} />
          </div>
          <Events events={user.userDefined} eventTitle={"Event Near You"} type={"card"} handleClick={handleClick} />
        </div>
      </div>
      {modalVisible && <EventModal userId={user.id} eventId={eventId} visible={modalVisible} handleClose={closeModal} isRsvpd={rsvpd()} />}
    </div>
  )
}

export default DashboardList

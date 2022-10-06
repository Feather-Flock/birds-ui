import React, { useState, useContext } from 'react'
import "./Dashboard.css"
import Events from "../Events/Events"
import EventModal from '../EventModal/EventModal'
import UserContext from '../../Context/UserContext';
import Map from '../Map/Map'
import SelectDropdown from '../SelectDropdown/SelectDropdown';

const Dashboard = ({refetch, handleSelect, range, setRange}) => {
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
    <div className="dashboard-container">
      {modalVisible && <EventModal userId={user.id} eventId={eventId} isRsvpd={rsvpd()} visible={modalVisible} handleClose={closeModal}/>}
      <div className="dashboard-main-container">
        <div className="welcome-container">
          <h1 className="welcome-message">Welcome back, {user.userName}!</h1>
          <div className="rsvp-eventcards">
            <Events events={user.rsvpdEvents} eventTitle={"Event You're Attending"} type={"card"} handleClick={handleClick} />
          </div>
        </div>
        <div className="dashboard-map-container">
          <div className="select-dropdown">
            <SelectDropdown handleSelect={handleSelect} range={range} />
          </div>
          <Map center={[user.lat, user.lng]} markers={user.userDefined} handleClick={handleClick} view={'Dashboard'}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./DashboardList.css"
import Events from "../Events/Events"
import EventModal from '../EventModal/EventModal'
import UserContext from '../../Context/UserContext';



const DashboardList = ({refetch}) => {
  
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

  return (
    <div className="dashboardList-container">
      <h1 className="welcome-user">Welcome {user.userName}!</h1>
      <div className="main-container">

        <div className="event-list">
          <Events events={user.rsvpdEvents} eventTitle={"Event you're Attending"} type={"list"} handleClick={handleClick}/>
        </div>

        <div className="event-list">
          <Events events={user.userDefined} eventTitle={"Event Near You"} type={"list"} handleClick={handleClick} />
        </div>

      </div>
        {modalVisible && <EventModal eventId={eventId} visible={modalVisible} handleClose={closeModal} />}
    </div>
  )
}

export default DashboardList

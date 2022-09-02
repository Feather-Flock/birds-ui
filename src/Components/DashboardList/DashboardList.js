import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./DashboardList.css"
import Events from "../Events/Events"
import EventModal from '../EventModal/EventModal'



const DashboardList = () => {
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {"id": process.env.REACT_APP_USER_ID}
  })

  const [modalVisible, setModalVisible] = useState(false)
  const [eventId, setEventId] = useState()
  const handleClick = (e) => {
    const {id} = e.target
    setEventId(id)
    setModalVisible(true)
  }

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  const closeModal = () => {
    setEventId(null)
    setModalVisible(false)
  }

  return (
    <div className="dashboardList-container">
      <h1 className="welcome-user">Welcome {data.user.userName}!</h1>
      <div className="main-container">

        <div className="event-list">
          <Events events={data.user.rsvpdEvents} eventTitle={"Event you're Attending"} type={"list"} handleClick={handleClick}/>
        </div>

        <div className="event-list">
          <Events events={data.user.nearEvents} eventTitle={"Event Near You"} type={"list"} handleClick={handleClick} />
        </div>

      </div>
        {modalVisible && <EventModal eventId={eventId} visible={modalVisible} handleClose={closeModal} />}
    </div>
  )
}

export default DashboardList

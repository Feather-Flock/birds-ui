import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./DashboardList.css"
import Events from "../Events/Events"
import EventModal from '../EventModal/EventModal'


const Dashboard = () => {
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {"id": "1"}
  })
  console.log(data, 'this is data')

  const [modalVisible, setModalVisible] = useState(false)

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  const handleClick = (e) => {
    const {id, value} = e.target
    let eventData =
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <div className="dashboardList-container">
      <h1 className="welcome-user">Welcome {data.userName}!</h1>
      <div className="main-container">

        <div className="rsvp-eventcards">
          <Events events={data.rsvpEvents} type={"list"} handleClick={handleClick}/>
        </div>

        <div className="event-list">
          <Events events={data.eventsNearUser} type={"list"} handleClick={handleClick} />
        </div>

      </div>
        {modalVisible && <EventModal visible={modalVisible} handleClose={closeModal} />}
    </div>
  )
}

export default Dashboard

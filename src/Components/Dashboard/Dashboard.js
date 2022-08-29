import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./Dashboard.css"
import Events from "../Events/Events"


const Dashboard = () => {
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {"id": "1"}
  })

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  return (
    <div className="dashboard-container">
      <nav className="nav-bar">
        <h1 className="welcome-user">Welcome {data.userName}!</h1>
        <NavLink to="/createEvent" className="nav-create-event">Create Event</NavLink>
      </nav>
      <div className="main-container">

        <div className="rsvp-eventcards">
          <Events events={data.rsvpEvents} type={"card"} />
        </div>

        <div className="event-list">
          <Events events={data.eventsNearUser} type={"list"} />
        </div>

      </div>
    </div>
  )
}

export default Dashboard
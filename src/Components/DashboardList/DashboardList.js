import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./DashboardList.css"
import Events from "../Events/Events"


const Dashboard = () => {
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {"id": "1"}
  })

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  return (
    <div className="dashboardList-container">
      <h1 className="welcome-user">Welcome {data.userName}!</h1>
      <div className="main-container">

        <div className="rsvp-eventcards">
          <Events events={data.rsvpEvents} type={"card"} />
        </div>

        <div className="event-list">
          <Events events={data.eventsNearUser} type={"list"} />
        </div>

      </div>
      <div className="map-view-btn">
          <Link className="view-link" to="/">
            <button className="map-view-button" role="button">Map View</button>
          </Link>
        </div>
    </div>
  )
}

export default Dashboard
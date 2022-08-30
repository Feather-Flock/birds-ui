import React from 'react'
import { Link } from "react-router-dom";
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
        <Link to="/new-event">
          <button class="button-85" role="button">Create Event</button>
        </Link>
      
      </nav>
      <div className="dashboard-main-container">

        <div className="rsvp-eventcards">
          <Events events={data.rsvpEvents} type={"card"} />
        </div>

        <div className="map-container">

        </div>

        <div className="list-view-btn">
          <Link to="/Dashboard-List">
            <button class="button-86" role="button">List View</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
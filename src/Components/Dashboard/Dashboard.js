import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./Dashboard.css"
import Events from "../Events/Events"

const Dashboard = () => {
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {"id": "1"}
  })

  useEffect(() => { //the following useEffect is what adds the map to the modal
    if(!loading && !error) {
      window.L.mapquest.key = process.env.REACT_APP_MAPQUEST_KEY;
      const container = window.L.DomUtil.get("map")
      if(container != null) {
        container._leaflet_id = null;
      }
      var map = window.L.mapquest.map('map', { // 'map' is the id on line 57
        center: [39.73352, -104.965847],
        layers: window.L.mapquest.tileLayer('map'),
        zoom: 12
      });

      window.L.marker([39.73352, -104.965847], { //to hover over marker it shows LV
        icon: window.L.mapquest.icons.marker(),
        draggable: false
      }).bindPopup("Denver, CO").addTo(map);

      window.L.circle([39.73352, -104.965847], { radius: 1000 }).addTo(map);
    }
  })

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  
  return (
    <div className="dashboard-container">
      <nav className="nav-bar">
        <h1 className="welcome-user">Welcome {data.userName}!</h1>
        <Link to="/new-event">
          <button className="button-85" role="button">Create Event</button>
        </Link>
      
      </nav>
      <div className="dashboard-main-container">

        <div className="rsvp-eventcards">
          <Events events={data.rsvpEvents} type={"card"} />
        </div>

        <div id="map" className="map-container">

        </div>

        <div className="list-view-btn">
          <Link to="/Dashboard-List">
            <button className="button-86" role="button">List View</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
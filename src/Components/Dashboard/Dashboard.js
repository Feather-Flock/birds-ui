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
      // map
      var map = window.L.mapquest.map('map', { // 'map' is the id on line 57
        center: [39.73352, -104.965847],
        layers: window.L.mapquest.tileLayer('map'),
        zoom: 11
      });

      // markers
      // Center
      window.L.marker([39.73352, -104.965847], { //to hover over marker it shows LV
        icon: window.L.mapquest.icons.marker(),
        draggable: true
      }).bindPopup("Denver, CO").addTo(map);

      // // Top Right
      // window.L.marker([39.78352, -104.8665847], { //to hover over marker it shows LV
      //   icon: window.L.mapquest.icons.marker(),
      //   draggable: false
      // }).bindPopup("Denver, CO").addTo(map);

      // // Bottom Right
      // window.L.marker([39.68352, -104.865847], { //to hover over marker it shows LV
      //   icon: window.L.mapquest.icons.marker(),
      //   draggable: false
      // }).bindPopup("Denver, CO").addTo(map);

      // // Top Left
      // window.L.marker([39.78352, -105.065847], { //to hover over marker it shows LV
      //   icon: window.L.mapquest.icons.marker(),
      //   draggable: false
      // }).bindPopup("Denver, CO").addTo(map);

      // // Bottom left
      // window.L.marker([39.68352, -105.065847], { //to hover over marker it shows LV
      //   icon: window.L.mapquest.icons.marker(),
      //   draggable: false
      // }).bindPopup("Denver, CO").addTo(map);
      // circle
      window.L.circle([39.73352, -104.965847], { radius: 1000 }).addTo(map);
    }
  })

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  
  return (
    <div className="dashboard-container">
      <nav className="nav-bar">
        <Link to="/profile">
        <button class="view-profile-button" role="button">View Profile</button>
        </Link>
        <Link to="/new-event">
          <button className="create-event-button" role="button">Create Event</button>
        </Link>
      
      </nav>
      <h1 className="welcome-user">Welcome {data.userName}!</h1>
      <div className="dashboard-main-container">

        <div className="rsvp-eventcards">
          <Events events={data.rsvpEvents} type={"card"} />
        </div>

        <div id="map" className="map-container">

        </div>

        <div className="list-view-btn">
          <Link to="/Dashboard-List">
            <button className="list-view-button" role="button">List View</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
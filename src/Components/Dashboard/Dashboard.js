import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./Dashboard.css"
import Events from "../Events/Events"

const Dashboard = () => {
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {"id": process.env.REACT_APP_USER_ID}
  })

  useEffect(() => { //the following useEffect is what adds the map to the modal
    if(!loading && !error) {
      //this is the api key to access mapquest
      window.L.mapquest.key = process.env.REACT_APP_MAPQUEST_KEY;

      //this is resetting the container so a new map is rendered on change
      const container = window.L.DomUtil.get("map")
      if(container != null) {
        container._leaflet_id = null;
      }
      // map being added to the div with id="map"
      var map = window.L.mapquest.map('map', { // 'map' is the id on line 59
        center: [39.73352, -104.965847], // hard coded now but will be dynamic with user lat/lng
        layers: window.L.mapquest.tileLayer('map'),
        zoom: 11
      });

      // markers
      data.eventsNearUser.map((nearbyEvent) => {
        let marker = window.L.marker([nearbyEvent.lat, nearbyEvent.lng], { //to hover over marker it shows event title
          icon: window.L.mapquest.icons.flag({//custom marker
            primaryColor: '#000000',
            secondaryColor: '#000000',
            size: 'sm',
            symbol: 'hello'
          }),
          draggable: true
        }).bindPopup(nearbyEvent.title).addTo(map);
        //event listener for marker will change to modal
        marker.on("click", (e) => {
          // Change this to toggle the Event Modal when built
          e.target.bindPopup(nearbyEvent.description)
        })
      });
    }
  })

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`


  return (
    <div className="dashboard-container">
      <h1 className="welcome-user">Welcome {data.userName}!</h1>
      <div className="dashboard-main-container">

        <div className="rsvp-eventcards">
          <Events events={data.rsvpEvents} type={"card"} />
        </div>

        <div id="map" className="map-container">

        </div>

        <div className="list-view-btn">
          <Link className="view-link" to="/Dashboard-List">
             <button className="list-view-button" role="button">List View</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

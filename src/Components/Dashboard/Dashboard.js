import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./Dashboard.css"
import Events from "../Events/Events"
import EventModal from '../EventModal/EventModal'


const Dashboard = () => {
  const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID, {
    variables: {"id": process.env.REACT_APP_USER_ID}
  })
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
      data.user.nearEvents.map((nearbyEvent) => {
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
          //mappedEvent is modeling what the event looks like when you
          //click on a button.  handleclick function is looking for
          // an id on e.target. >> e.target.id === mappedEvent.target.id
          const mappedEvent = {target: {id: nearbyEvent.id}}
          handleClick(mappedEvent)
        })
      });
    }
  })

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  const rsvpd = () => {
    const eventFound = data.user.rsvpdEvents.find(ev => ev.id === eventId)
    return eventFound ? true : false
  }
  
  return (
    <div className="dashboard-container">
      {modalVisible && <EventModal userId={data.user.id} eventId={eventId} isRsvpd={rsvpd()} visible={modalVisible} handleClose={closeModal}/>}

      <div className="dashboard-main-container">
        <div className="rsvp-eventcards">
          <Events events={data.user.rsvpdEvents} eventTitle={"Event you're Attending"} type={"card"} handleClick={handleClick} />
        </div>
        <div id="map" className="map-container"></div>

      </div>
    </div>
  )
}

export default Dashboard





import React, { useState, useEffect } from 'react'
import './EventForm.css'


export default function EventForm() {
  const [eventDetails, setEventDetails] = useState({title: '',
  date:'',
  location:'',
  description:''})
  const [searchOptions, setSearchOptions] = useState([])
  const [searchInfo, setSearchInfo] = useState([])
  const [eventObject, setEventObject] = useState({})

useEffect(() => {
  window.L.mapquest.key = process.env.REACT_APP_MAPQUEST_KEY;

  //this is resetting the container so a new map is rendered on change
  const container = window.L.DomUtil.get("map")
  if(container != null) {
    container._leaflet_id = null;
  }

  var map = window.L.mapquest.map('map', {
    center: [39.73352, -104.965847],
    layers: window.L.mapquest.tileLayer('map'),
    zoom: 11
  });
},[])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEventDetails({...eventDetails, [name]: value})
  }

  const handleSearch = (e) => {
    handleChange(e)
    setSearchOptions([])
    const {name, value} = e.target
    if(value.length < 2){ return }
    fetch(`http://www.mapquestapi.com/search/v3/prediction?key=${process.env.REACT_APP_MAPQUEST_KEY }&limit=3&collection=adminArea,poi,address,category,franchise,airport&q=${value}&location=-104.671828,
            39.840072`)
            .then(response => response.json())
            .then(data => {
                data.results.map((result) => {
                  setSearchInfo([...searchInfo, result])
                  setSearchOptions([...searchOptions, result.displayString])
                })
            })
  }

  const handleSelection = (e) => {
    const {value} = e.target;

    console.log(e.target, value)
      setEventDetails({...eventDetails, location:value})
      setSearchOptions([]);
  }


  return (
    <div className='form-wrapper'>
    <div id="map" className="map-container"></div>
      <form className="event-form">
        <h1 className="form-header">Create A New Event</h1>
        <input className='event-input' onChange={handleChange} type='text' placeholder='Add Title' name='title' value={eventDetails.title}/>

        <br/>
        <span className="material-symbols-outlined">schedule</span>
        <input className='event-input' onChange={handleChange} type='datetime-local' name='date' value={eventDetails.date}/>
        <br/>
          <span className="material-symbols-outlined">pin_drop</span>
        <input className='event-input'
        onChange={handleSearch}
        type='text'
        name='location'
        value={eventDetails.location}
        placeholder='location'/>
        <div className='drop-down'>
          {searchOptions.map((option)=> {
            return <option value={option} onClick={handleSelection} className='drop-down-row'>{option}</option>
          })}
        </div>
        <br/>
        <input className='event-input description'
        onChange={handleChange} type='text'
        name='description'
        value={eventDetails.description}
        placeholder='Add a description for your event'/>
        <button className='submit-event'>Save Event</button>
      </form>
    </div>
  )
}

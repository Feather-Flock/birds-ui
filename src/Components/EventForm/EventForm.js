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

const makeMarkerMap = (location) => {
  console.log(location.place.geometry.coordinates)
    window.L.mapquest.key = process.env.REACT_APP_MAPQUEST_KEY;
  const container = window.L.DomUtil.get("map")
  if(container != null) {
    container._leaflet_id = null;
  }

  var map = window.L.mapquest.map('map', {
    center: [location.place.geometry.coordinates[1],location.place.geometry.coordinates[0]],
    layers: window.L.mapquest.tileLayer('map'),
    zoom: 15
  });

  let marker = window.L.marker( [location.place.geometry.coordinates[1],location.place.geometry.coordinates[0]], { //to hover over marker it shows event title
    icon: window.L.mapquest.icons.flag({//custom marker
      primaryColor: '#000000',
      secondaryColor: '#000000',
      size: 'sm',
      symbol: 'hello'
    }),
    draggable: true
  }).bindPopup(location.name).addTo(map);
}


  const handleChange = (e) => {
    const {name, value} = e.target;
    setEventDetails({...eventDetails, [name]: value})
  }

  const handleSearch = (e) => {
    handleChange(e)
    setSearchOptions([])
    setSearchInfo([])
    const {name, value} = e.target
    if(value.length < 2){ return }
    fetch(`http://www.mapquestapi.com/search/v3/prediction?key=${process.env.REACT_APP_MAPQUEST_KEY }&limit=3&collection=adminArea,poi,address,category,franchise,airport&q=${value}&location=-104.671828,
            39.840072`)
            .then(response => response.json())
            .then(data => {
                data.results.map((result) => {
                  setSearchInfo([...searchInfo, result])
                  setSearchOptions([...searchOptions, {name: result.displayString, id: result.id}])
                })
            })
  }

  const handleSelection = (e) => {
    const {value, id} = e.target;
      setEventDetails({...eventDetails, location:value})
      setSearchOptions([]);
      setSearchInfo(() => {
        return searchInfo.find((result) => {
          if(result.id === id ) {
            makeMarkerMap(result)
            return result
          }
        })
      })
  }


  return (
    <div className='form-wrapper'>
      <div id="map" className="event-form-map-container"></div>
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
            return <option id={option.id} value={option.name} onClick={handleSelection} className='drop-down-row'>{option.name}</option>
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

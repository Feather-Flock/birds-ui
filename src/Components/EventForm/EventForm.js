import React, { useState } from 'react'
import './EventForm.css'


export default function EventForm() {
  const [eventDetails, setEventDetails] = useState({title: '',
  date:'',
  location:{},
  description:''})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEventDetails({...eventDetails, [name]: value})
  }

  const handleSearch = (e) => {
    const {name, value} = e.target
    if(value.length > 2){ return }
    fetch(`http://www.mapquestapi.com/search/v3/prediction?key=${process.env.REACT_APP_MAPQUEST_KEY }&limit=10&collection=adminArea,poi,address,category,franchise,airport&q=${value}&location=-104.671828,
            39.840072`)
            .then(response => response.JSON())
            .then(data => console.log(data))
  }


  return (
    <div className='form-wrapper'>
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

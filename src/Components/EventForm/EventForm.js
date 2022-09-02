import React, { useState } from 'react'
import './EventForm.css'


export default function EventForm() {
  const [eventDetails, setEventDetails] = useState({title: '',
  date:'',
  location:'',
  description:''})
  const [searchOptions, setSearchOptions] = useState([])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEventDetails({...eventDetails, [name]: value})
  }

  const handleSearch = (e) => {
    handleChange(e)
    setSearchOptions([])
    const {name, value} = e.target
    console.log(value, eventDetails.location)
    if(value.length < 2){ return }
    fetch(`http://www.mapquestapi.com/search/v3/prediction?key=${process.env.REACT_APP_MAPQUEST_KEY }&limit=3&collection=adminArea,poi,address,category,franchise,airport&q=${value}&location=-104.671828,
            39.840072`)
            .then(response => response.json())
            .then(data => {
                data.results.map((result) => {
                  setSearchOptions([...searchOptions, result.displayString])
                })
            })
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
        <div className='drop-down'>
          {searchOptions.map((option)=> {
            return <div className='drop-down-row'>{option}</div>
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

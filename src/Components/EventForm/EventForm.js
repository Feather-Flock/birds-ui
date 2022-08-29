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

  return (
    <div className='form-wrapper'>
      <form>
        <h1 style={{textAlign: 'right',
          marginRight: '20%'}}>Create A New Event</h1>
        <input className='event-input' onChange={handleChange} type='text' placeholder='Add Title' name='title' value={eventDetails.title}/>
        <br/>
        <input className='event-input' onChange={handleChange} type='datetime-local' name='date' value={eventDetails.date}/>
        <br/>
        <input className='event-input' onChange={handleChange} type='text' name='location' value={eventDetails.location} placeholder='location'/>
        <br/>
        <input className='event-input description' onChange={handleChange} type='text' name='description' value={eventDetails.description} placeholder='Add a description for your event'/>
        <button className='submit-event'>Add Event</button>
      </form>
    </div>
  )
}

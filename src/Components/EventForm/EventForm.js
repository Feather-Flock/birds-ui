import React, { useState } from 'react'
import './EventForm.css'

export default function EventForm() {
  const [eventDetails, setEventDetails] = useState({})
  return (
    <div className='form-wrapper'>
      <form>
        <h1>Create A New Event</h1>
        <input className='event-input' type='text' placeholder='Add Title' name='title' value=''/>
        <br/>
        <input className='event-input' type='datetime-local' name='date' value=''/>
        <br/>
        <input className='event-input' type='text' name='location' value='' placeholder='location'/>
        <br/>
        <input className='event-input' type='text' name='description' value='' placeholder='Add a description for your event'/>
        <button>Add Event</button>
      </form>
    </div>
  )
}

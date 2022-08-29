import React, { useState }from 'react'

export EventForm = () => {
  const [eventDetails, setEventDetails] = useState({})
  return (
    <form>
      <h1>Create A New Event</h1>
      <input type='text' placeholder='Add Title' name='title' value=''></input>
    </form>
  )
}

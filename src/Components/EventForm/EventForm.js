import React, { useState } from 'react'
import './EventForm.css'
import { useMutation } from "@apollo/client";
import { MAKE_NEW_EVENT } from '../../queries'
import Map from '../Map/Map'


const EventForm = ({ refetch }) => {
  const [center, setCenter] = useState([39.7317, -104.9214])
  const [marker, setMarker] = useState([])
  const [markerLabel, setMarkerLabel] = useState()
  const [eventDetails, setEventDetails] = useState({title: '',
  date:'',
  time:'',
  location:'',
  description:''})
  const [searchOptions, setSearchOptions] = useState([])
  const [searchInfo, setSearchInfo] = useState([])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEventDetails({...eventDetails, [name]: value})
  }

  const handleSearch = (e) => {
    handleChange(e)
    setSearchOptions([])
    setSearchInfo([])
    const { value } = e.target
    if(value.length < 2){ return }

    fetch(`http://www.mapquestapi.com/search/v3/prediction?key=${process.env.REACT_APP_MAPQUEST_KEY }&limit=3&collection=adminArea,poi,address,category,franchise,airport&q=${value}&location=-104.671828,
            39.840072`)
            .then(response => response.json())
            .then(data => {
                data.results.map((result) => {
                  setSearchInfo([...searchInfo, result]) //Makes array of search objects
                  setSearchOptions([...searchOptions, {name: result.displayString, id: result.id}]) //array of the display name and id (might delete?)
                  return result
                })
            })
  }

  const handleSelection = (e) => {
    const {value, id} = e.target;
      setSearchInfo(() => {
        return searchInfo.find((result) => {
          if(result.id === id) {
            setMarker([{lat: result.place.geometry.coordinates[1], lng: result.place.geometry.coordinates[0]}])
            setCenter([result.place.geometry.coordinates[1], result.place.geometry.coordinates[0]])
            setMarkerLabel([result.name]) //Makes the map with the specific marker

            return result
          }
          return result.id === id
        })
      })
      setEventDetails({...eventDetails, location:value})
      setSearchOptions([]);
  }

  const handleSubmit = (e) =>  {
    e.preventDefault()
    let timeArray = eventDetails.date.split('T');
    mutateCreateEvent({
      variables: {input:
        {
          title: eventDetails.title,
          description: eventDetails.description,
          time: timeArray[1],
          date: timeArray[0],
          address: searchInfo?.place?.properties?.street,
          city: searchInfo?.place?.properties?.city,
          state: searchInfo?.place?.properties?.stateCode,
          zip: parseInt(searchInfo?.place?.properties?.postalCode),
          slug: searchInfo?.slug,
          host: parseInt(process.env.REACT_APP_USER_ID),
        }
      }
    })
      if(createdResponse) {
        refetch()
        alert('New Event Made!')
        setEventDetails({title: '',
        date:'',
        time:'',
        location:'',
        description:''})
        setMarker([])
        setCenter([39.7317, -104.9214])
    }
  }

  const [mutateCreateEvent, createdResponse] = useMutation(MAKE_NEW_EVENT,
    {
      variables: {input:
      {
        title: eventDetails.title,
        description: eventDetails.description,
        time: eventDetails.time,
        date: eventDetails.date,
        address: searchInfo?.place?.properties?.street,
        city: searchInfo?.place?.properties?.city,
        state: searchInfo?.place?.properties?.stateCode,
        zip: parseInt(searchInfo?.place?.properties?.postalCode),
        slug: searchInfo?.slug,
        host: parseInt(process.env.REACT_APP_USER_ID),
      }
    }
  })

  return (
    <div className='form-wrapper'>
      <form className="event-form">
        <h1 className="form-header">Create A New Event</h1>
        <input className='event-input' onChange={handleChange} type='text' placeholder='Add Title' name='title' value={eventDetails.title}/>

        <br/>
        <span className="material-symbols-outlined">schedule</span>
        <input className='event-input' onChange={handleChange} type='datetime-local' name='date' value={eventDetails.date}/>
        <br/>
          <Map center={center} markers={marker} markerLabel={markerLabel} view='event-form'/>
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
        <button onClick={handleSubmit}className='submit-event'>Save Event</button>
      </form>
    </div>
  )
}
export default EventForm

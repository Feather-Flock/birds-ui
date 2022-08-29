import React from 'react'
import EventCard from "../EventCard/EventCard"

const Events = ({events, type}) => {

  const eventCards = () => {
    return events.map(event => {
      return ( 
        <EventCard
        id={event.id}
        key={event.id}
        type={type}
        title={event.title}
        description={event.description}
        date={event.date}
        time={event.time}
        />
      )
    })
  }

  return (
    <div>{eventCards()}</div>
  )
}

export default Events
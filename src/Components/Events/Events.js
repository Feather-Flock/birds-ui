import React from 'react'
import EventCard from "../EventCard/EventCard"

const Events = ({events, type, handleClick}) => {

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
        handleClick={handleClick}
        />
      )
    })
  }

  return (
    <div>{eventCards()}</div>
  )
}

export default Events

import React from 'react'
import EventCard from "../EventCard/EventCard"

const Events = ({events}) => {

  const eventCards = () => {
    return events.map(event => {
      return(
        <EventCard
        id={event.id}
        title={event.title}
        description={event.description}
        date={event.date}
        time={event.time}
        />
      )
    })
  }

  return (
    <div>{eventCards}</div>
  )
}

export default Events
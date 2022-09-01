import React from 'react'
import EventCard from "../EventCard/EventCard"
import { Keyboard, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
const Events = ({events, type, handleClick}) => {

  const eventCards = () => {
    return events.map(event => {
      return (
        <SwiperSlide>
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
        </SwiperSlide>
      )
    })
  }

  return (
    <React.Fragment>
    <Swiper
      className="mySwiper"
      modules={[Navigation]}
      navigation={true}
      // install Swiper modules
      spaceBetween={50}
      slidesPerView={1}
    >
      {eventCards()}
    </Swiper>
    </React.Fragment>
  )
}

export default Events

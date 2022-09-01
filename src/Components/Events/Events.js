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
      let eventCard = <EventCard
        id={event.id}
        key={event.id}
        type={type}
        title={event.title}
        description={event.description}
        date={event.date}
        time={event.time}
        handleClick={handleClick}
      />
      if(type === "list") {
        return (
          <React.Fragment>
            {eventCard}
          </React.Fragment>
        )
      } else {
        return (
          <SwiperSlide>
            {eventCard}
          </SwiperSlide>
        )
      }
    })
  }

  if(type === "list") {
    return (
      <React.Fragment>
        {eventCards()}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Swiper
          className="mySwiper"
          modules={[Navigation]}
          navigation={true}
          centeredSlides={true}
          // install Swiper modules
          spaceBetween={50}
          slidesPerView={1}
        >
          {eventCards()}
        </Swiper>
      </React.Fragment>
    )
  }
}

export default Events

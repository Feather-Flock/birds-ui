import React from 'react'
import EventCard from "../EventCard/EventCard"
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Pagination])

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
          <SwiperSlide style={{ margin: '0 0 0 50' }}>
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
      <>
        <Swiper
          loop={true}
          cssMode={true}
          className="mySwiper"
          pagination={true}
          centeredSlides={true}
          spaceBetween={50}
        >
          {eventCards()}
        </Swiper>
      </>
    )
  }
}

export default Events

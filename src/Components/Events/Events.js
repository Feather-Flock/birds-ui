import React from 'react'
import EventCard from "../EventCard/EventCard"
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { v4 as uuidv4 } from 'uuid';

SwiperCore.use([Pagination, Navigation])

const Events = ({events, eventTitle, type, handleClick, deleteClick, userEvent}) => {

  const eventCards = () => {
    return events.map(event => {
      let eventCard = <EventCard
        id={event.id}
        type={type}
        eventTitle={eventTitle}
        title={event.title}
        description={event.description}
        date={event.date}
        time={event.time}
        handleClick={handleClick}
        deleteClick={deleteClick}
        userEvent={userEvent}
      />
      if(type === "list") {
        return (
          <React.Fragment key={uuidv4()}>
            {eventCard}
          </React.Fragment>
        )
      } else {
        return (
          <SwiperSlide style={{ margin: '0 0 0 50' }} key={uuidv4()}>
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
          loop={false}
          cssMode={true}
          className="mySwiper"
          pagination={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          centeredSlides={true}
          spaceBetween={50}
          keyboard={true}
          key={uuidv4()}
        >
          {eventCards()}
        </Swiper>
      </>
    )
  }
}

export default Events

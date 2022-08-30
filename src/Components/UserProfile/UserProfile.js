import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./UserProfile.css";

// SETUP AS A FAMILY VIEW FROM THE EVENT DETAILS PAGE

const UserProfile = () => {
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {"id": "1"}
  })

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  const rsvpdEvents = data.rsvpEvents.map(event => {
    // Change to an EventCard component when Blue finishes
    // Need an event photo?
    return (
      <div className="event-container">
        <h2 className="attending-header">Attending</h2>
        <div className="event-picture-wrapper">
          <img className="event-picture" alt="event festivities"></img>
        </div>
        <div className="title-and-rsvp-container">
          <h3 className="title">{event.title}</h3>
          <p className="description">{event.description}</p>
          <button className="rsvp-button">RSVP!</button>
        </div>
      </div>
    )
  });

  // const tags = data.tags.map(tag => {
  //   return (
  //     <p className="tag-title">tag.title</p>
  //   );
  // });

  return (
    <div className="user-profile-page">
    
      <section className="left-container">
        <img className="profile-picture" src={data.image} alt="family profile"></img>
        
        <div className="name-wrapper">
          <h2 className="family-name">{data.userName}</h2>
        </div>

        <div className="location-wrapper">
          <span className="material-symbols-outlined">pin_drop</span>
          <h3 className="location">{data.zipCode}</h3>
        </div>

        <p className="description-text-box">{data.description}</p>
      
        <div className="tag-container">
          <p className="tag-title">2 Kids</p>
          <p className="tag-title">MLM</p>
          <p className="tag-title">Married</p>
          <p className="tag-title">Monogamous</p>
        </div>
      </section>

      <section className="right-container">
        {rsvpdEvents}
      </section>
    </div>
  )
};

export default UserProfile;
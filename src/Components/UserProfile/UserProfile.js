import React from "react";
import "./UserProfile.css";

// Does this component need state?
// How does the data look? Will be grabbing a user via ID

// Will need to map over user tags
// Will need to map over the events
// Will need a different view for current logged in user vs. other user

const UserProfile = () => {
  return (
    <div className="user-profile-page">
    
      <section className="left-container">
        <div className="profile-picture-wrapper">
          <img className="profile-picture" alt="family profile"></img>
        </div>
        
        <div className="name-wrapper">
          <h2 className="family-name">The XXXXXXXXX Family</h2>
        </div>

        <div className="location-wrapper">
          <span className="material-symbols-outlined">pin_drop</span>
          <h3 className="location">Denver, CO</h3>
        </div>

        <p className="description-text-box">
          Description of your family
        </p>
      
        <div className="tag-container">
          <p className="tag-title">2 Kids</p>
          <p className="tag-title">MLM</p>
          <p className="tag-title">Married</p>
          <p className="tag-title">Monogamous</p>
        </div>
      </section>

      <section className="right-container">
        <div className="event-container">
          <h2 className="attending-header">Attending</h2>

          <div className="event-picture-wrapper">
            <img className="event-picture" alt="event festivities"></img>
          </div>

          <div className="title-and-rsvp-container">
            <h3 className="title">Morning Hike & Picnic</h3>
            <button className="rsvp-button">RSVP!</button>
          </div>
        </div>

        <div className="event-container">
          <div className="attending-wrapper">
            <h2 className="attending-header">Attending</h2>
          </div>

          <div className="event-picture-wrapper">
            <img className="event-picture" alt="event festivities"></img>
          </div>

          <div className="title-and-rsvp-container">
            <h3 className="title">City Park for Games</h3>
            <button className="rsvp-button">RSVP!</button>
          </div>
        </div>

        <div className="event-container">
          <div className="attending-wrapper">
            <h2 className="attending-header">Attending</h2>
          </div>

          <div className="event-picture-wrapper">
            <img className="event-picture" alt="event festivities"></img>
          </div>

          <div className="title-and-rsvp-container">
            <h3 className="title">Another event here!</h3>
            <button className="rsvp-button">RSVP!</button>
          </div>
        </div>
  
      </section>
    </div>
  )
};

export default UserProfile;
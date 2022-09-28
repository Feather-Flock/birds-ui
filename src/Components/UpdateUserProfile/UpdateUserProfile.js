import React from "react";
import "./UpdateUserProfile.css";

const UpdateUserProfile = ({ userData }) => {
  console.log(userData)

  // username state
  // image state
  // zip code state
  // description state
  // tags state

  // need to map over the tags
  // need to map over the zips

  // onChange should take in the new input and save the new value


  return (
    <form className="update-profile-form">

      <section className="top-container">

        <section className="left-container">
          <label className="form-label">Edit Username:</label>
          <input className="name-wrapper" 
            name="username" 
            type="text" 
            // placeholder="i'm a placehold for the name" 
            value={userData.userName}
            onChange="do something"
          />

          <img className="profile-picture"  src={userData.image} alt="family profile"></img>
          {/* need to figure out how to edit a photo */}

          <label className="form-label" htmlFor="zipcode-select">Edit ZIP Code:</label>
          <select name="zipcode" id="zipcode-select" className="location-wrapper">
            <option value="">{userData.zipCode}</option>
            {/* need to map over the zip code array */}
            <option value="80010">80010</option>
            <option value="80011">80011</option>
          </select>
    
        </section>

        <section className="right-container">
          <label className="form-label">Edit Description:</label>
          <input className="description-text-box"
            name="description" 
            type="text-area" 
            // placeholder="i'm a placehold for the description" 
            value={userData.description}
            onChange="do something"
          />
          {/* need to figure out to create a drop down menu that adds the tags after select */}
          <div className="tag-container">
            <p className="tag-title">2 Kids</p>
            <p className="tag-title">MLM</p>
            <p className="tag-title">Married</p>
            <p className="tag-title">Monogamous</p>
          </div>

          <div className="update-profile-button-container">
            <button className="cancel-profile-changes-button">Cancel</button>
            <button className="save-profile-changes-button">Save Changes</button>
          </div>
        </section>

      </section>

    </form>
  )
};

export default UpdateUserProfile;
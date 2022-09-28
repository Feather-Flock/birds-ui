import React, { useState } from "react";
import "./UpdateUserProfile.css";
import zipcodes from "../../zipcodes";

const UpdateUserProfile = ({ userData }) => {

  const [username, setUsername] = useState(userData.userName);
  const [image, setImage] = useState(userData.image);
  const [zipcode, setZipcode] = useState(userData.zipCode);
  const [description, setDescription] = useState(userData.description);
  // const [tags, setTags] = useState("");
  
  const zipcodeOptions = zipcodes.map(zip => {
    return (
      <option value={zip}>{zip}</option>
    )
  });



  // need to map over the tags
  // onChange should take in the new input and save the new value

  return (
    <form className="update-profile-form">
      <p className="editting-banner">Edit User Profile</p>

      <section className="top-container">

        <section className="left-container">
          <label className="form-label">Edit Username:</label>
          <input className="name-wrapper" 
            name="username" 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <img className="profile-picture"  src={image} alt="family profile"></img>
          {/* need to figure out how to edit a photo */}

          <label className="form-label" htmlFor="zipcode-select">Edit ZIP Code:</label>
          <select name="zipcode" id="zipcode-select" className="location-wrapper">
            <option value="">{zipcode}</option>
            {zipcodeOptions}
          </select>
    
        </section>

        <section className="right-container">
          <label className="form-label">Edit Description:</label>
          <textarea className="description-text-box"
            name="description" 
            rows="10"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}>
          </textarea>

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
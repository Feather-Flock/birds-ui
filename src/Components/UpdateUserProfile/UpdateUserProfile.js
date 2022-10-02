import React, { useState, useEffect } from "react";
import "./UpdateUserProfile.css";
import zipcodes from "../../zipcodes";
import { v4 as uuidv4 } from 'uuid'
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE } from '../../queries'
import tags from "../../identityTags";

const UpdateUserProfile = ({ userData }) => {

  const [username, setUsername] = useState(userData.userName);
  const [image, setImage] = useState(userData.image);
  const [zipcode, setZipcode] = useState(userData.zipCode);
  const [description, setDescription] = useState(userData.description);

  const [mutateUpdateProfile, updatedResponse] = useMutation(UPDATE_USER_PROFILE)
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    let allOptions = tags.map((string) => {
      return <option key={uuidv4()} value={string}>{string}</option>
    })
    setAllTags(allOptions)
  },[])

  // const [tags, setTags] = useState("");
  // Will need to map over the users tags when they have been added to a user

  const zipcodeOptions = zipcodes.map(zip => {
    return (
      <option key={uuidv4()} value={zip}>{zip}</option>
    )
  });

  const handleSaveChanges = () => {
    mutateUpdateProfile({
      variables: { input: {id: parseInt(userData.id), userName: username, zipCode: zipcode, description: description}}
    })
  };



  return (
    <form className="update-profile-form">
      <p className="editting-banner">Edit your profile</p>

      <section className="top-container">
        <section className="left-container">
          <label className="form-label" htmlFor="username">Edit Username:</label>
          <input className="name-wrapper"
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="form-label" htmlFor="profile-picture">Edit Image:</label>
          {/* need an input for update/add a photo  */}
          <img className="profile-picture" id="profile-picture" src={image} alt="family profile"></img>

          <label className="form-label" htmlFor="zipcode-select">Edit ZIP Code:</label>
          <select name="zipcode" id="zipcode-select" className="location-wrapper" onChange={(e) => setZipcode(e.target.value)}>
            <option value="">{zipcode}</option>
            {zipcodeOptions}
          </select>
        </section>

        <section className="right-container">
          <label className="form-label" htmlFor="description">Edit Description:</label>
          <textarea className="description-text-box"
            id="description"
            name="description"
            rows="10"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}>
          </textarea>

          {/* need to figure out to create a drop down menu that adds/removes tags like Terminal */}
          <div className="tag-container">
            <div className='tags'>
              <p className="tag-title">2 Kids</p>
              <p className="tag-title">MLM</p>
              <p className="tag-title">Married</p>
              <p className="tag-title">Monogamous</p>
            </div>
            <select>
              <option>--Add Tag--</option>
              {allTags}
            </select>
            <button>Add Tag</button>
          </div>

          <div className="update-profile-button-container">
            <Link to={{
              pathname: "/profile",
              state: {userId: "1"}
            }}>
              <p className="cancel-profile-changes">Cancel</p>
            </Link>
            <button className="save-profile-changes-button" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </section>
      </section>
    </form>
  )
};

export default UpdateUserProfile;

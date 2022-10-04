import React, { useState, useEffect } from "react";
import "./UpdateUserProfile.css";
import zipcodes from "../../zipcodes";
import { v4 as uuidv4 } from 'uuid'
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER_PROFILE, GET_ALL_TAGS, CREATE_USER_TAG} from '../../queries'
import tags from "../../identityTags";

const UpdateUserProfile = ({ userData }) => {

  const [username, setUsername] = useState(userData.userName);
  const [image, setImage] = useState(userData.image);
  const [zipcode, setZipcode] = useState(userData.zipCode);
  const [description, setDescription] = useState(userData.description);
  const [tag, setTag] = useState({})

  const [mutateUpdateProfile, updatedResponse] = useMutation(UPDATE_USER_PROFILE)
  const [mutateAddUserTag, updatedTags] = useMutation(CREATE_USER_TAG)
  const {loading, error, data, refetch} = useQuery(GET_ALL_TAGS)


  const userTags = userData.userTags.map((string) => {
    return <p className='tag-container'>{string.title}</p>
  });

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

  const handleImageChange = (e) => {
  setImage(URL.createObjectURL(e.target.files[0]))
  }

  const allTags = data?.tags.map((string) => {
    return <option key={string.id} id={string.id} value={string.id}>{string.title}</option>
  })

  const handleAddTag = (e) => {
    e.preventDefault()
    console.log(tag)
    mutateAddUserTag({
      variables: {input: {userId: parseInt(userData.id), tagId: parseInt(tag.tagId)}}
    })

  }



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
          <img className="profile-picture" id="profile-picture" src={image} alt="family profile"></img>
          <input className='image-input' type='file' accept='image/*' onChange={handleImageChange}/>

          <br/>
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
              {userTags}
            </div>
              <select onChange={(e) => {setTag({tagId: e.target.value})}}>
                <option>--Add Tag--</option>
                {allTags}
              </select>
              <button className='tag-button' onClick={handleAddTag}>Add Tag</button>
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

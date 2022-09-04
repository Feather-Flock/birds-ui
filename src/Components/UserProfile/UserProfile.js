import React, {useState, useContext} from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./UserProfile.css";
import EventModal from '../EventModal/EventModal'
import Events from "../Events/Events"
import UserContext from '../../Context/UserContext';

// SETUP AS A FAMILY VIEW FROM THE EVENT DETAILS PAGE
// Can use a query hook for data for DRY code or just pass as props

const UserProfile = () => {

  const user = useContext(UserContext)
  
  const [modalVisible, setModalVisible] = useState(false)
  const [eventId, setEventId] = useState()
  const handleClick = (e) => {
    const {id} = e.target
    setEventId(id)
    setModalVisible(true)
  }

  const closeModal = () => {
    setEventId(null)
    setModalVisible(false)
  }

  // Will need to iterate over tags to render them. Code for that:
  
  // const tags = data.tags.map(tag => {
  //   return (
  //     <p className="tag-title">tag.title</p>
  //   );
  // });

  return (
    <div className="user-profile-page">
      {modalVisible && <EventModal eventId={eventId} visible={modalVisible} handleClose={closeModal} />}
      <section className="left-container">
        <img className="profile-picture" src={user.image} alt="family profile"></img>
        
        <div className="name-wrapper">
          <h2 className="family-name">{user.userName}</h2>
        </div>

        <div className="location-wrapper">
          <span className="material-symbols-outlined">pin_drop</span>
          <h3 className="location">{user.zipCode}</h3>
        </div>

        <p className="description-text-box">{user.description}</p>
        
        <div className="tag-container">
          <p className="tag-title">2 Kids</p>
          <p className="tag-title">MLM</p>
          <p className="tag-title">Married</p>
          <p className="tag-title">Monogamous</p>
        </div>
      </section>

      <section className="right-container">
        <Events events={user.rsvpdEvents} eventTitle={"Event you're Attending"} type={"card"} handleClick={handleClick} />
        <Events events={user.userEvents} eventTitle={"Event you've Created"} type={"card"} handleClick={handleClick} />

      </section>
    </div>
  )
};

export default UserProfile;

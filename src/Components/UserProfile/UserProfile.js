import React, {useState, useContext} from "react";
import { useLocation } from "react-router";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import "./UserProfile.css";
import EventModal from '../EventModal/EventModal'
import Events from "../Events/Events"
import UserContext from '../../Context/UserContext';

const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [eventId, setEventId] = useState()
  // If you click on a link with state, it will be defined here using useLocation hook.
  // This allows us to pass a hostId to the User Profile from the Event Modal.
  const { state } = useLocation()

  let user = useContext(UserContext)
  let title = state ? "They" : "You've"
  
  //useLazyQuery allows us to create a function that can be invoked when we want it to.
  // Here we are using queryHost function only if state from above exists.
  // This means we want to query the host by id, instead of using our signed in user.
  const [queryHost, {loading, error, data}] = useLazyQuery(GET_USER_BY_ID, {
    variables: {"id": state?.hostId}
  })

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  // If state exists and data is undefined, call queryHost function to get host.
  // If state is undefined, then hostId isn't present, and we render the current user profile.
  if(state && !data){
    queryHost()
  } else if (state && data) {
    user = data.user
  }

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
      <section className="top-container">
        <section className="left-container">
          <div className="name-wrapper">
            <h2 className="family-name">{user.userName}</h2>
          </div>
          <img className="profile-picture" src={user.image} alt="family profile"></img>
          

          <div className="location-wrapper">
            <div className="material-symbols-outlined">pin_drop</div>
            <h3 className="location">{user.zipCode}</h3>
          </div>
        </section>

        <section className="right-container">
          
          <div className="tag-container">
            <p className="tag-title">2 Kids</p>
            <p className="tag-title">MLM</p>
            <p className="tag-title">Married</p>
            <p className="tag-title">Monogamous</p>
          </div>
          <p className="description-text-box">{user.description}</p>
        </section>
      </section>

      <section className="bottom-container">
        <section className="left-container card">
          <Events events={user.userEvents} eventTitle={`Event ${title} Created`} type={"card"} handleClick={handleClick} />
        </section>
        <section className="right-container card">
          {!state && <Events events={user.rsvpdEvents} eventTitle={"Event you're Attending"} type={"card"} handleClick={handleClick} />}
        </section>
      </section>
    </div>
  )
};

export default UserProfile;

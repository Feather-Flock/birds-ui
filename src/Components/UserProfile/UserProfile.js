import React, {useState, useContext} from "react";
import { useLocation } from "react-router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_BY_ID, DELETE_EVENT } from "../../queries";
import "./UserProfile.css";
import EventModal from '../EventModal/EventModal'
import Events from "../Events/Events"
import UserContext from '../../Context/UserContext';
import LoadingPage from "../LoadingPage/LoadingPage";
import Error from "../Error";

const UserProfile = ({refetch, range}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [eventId, setEventId] = useState()
  
  const { state } = useLocation()

  let user = useContext(UserContext)
  let title = state ? "They" : "You've"
  
  const [queryHost, hostResponse] = useLazyQuery(GET_USER_BY_ID)

  const [deleteEvent, deleteResponse] = useMutation(DELETE_EVENT)

  if(hostResponse.loading) return <LoadingPage />
  if(hostResponse.error) return <Error message={hostResponse.error.message} />

  if(state && !hostResponse?.data){
    queryHost({variables: {id: state?.hostId, range: parseInt(range.value)}})
  } else if (state && hostResponse?.data) {
    user = hostResponse?.data.user
  }

  const handleClick = (e) => {
    const {id} = e.target
    setEventId(id)
    setModalVisible(true)
  }

  const closeModal = () => {
    setEventId(null)
    setModalVisible(false)
    refetch()
  }

  const deleteClick = (id) => {
    deleteEvent({ variables: { input: {id: parseInt(id)}}})
    refetch({variables: {"id": process.env.REACT_APP_USER_ID, "range": parseInt(range.value)}})
  }

  const rsvpd = () => {
    const eventFound = user.rsvpdEvents.find(ev => ev.id === eventId)
    return eventFound ? true : false
  }

  return (
    <div className="user-profile-page">
      {modalVisible && <EventModal userId={user.id} eventId={eventId} visible={modalVisible} handleClose={closeModal} isRsvpd={rsvpd()} />}
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
          <Events events={user.userEvents} eventTitle={`Event ${title} Created`} type={"card"} userEvent={true} handleClick={handleClick} deleteClick={deleteClick}/>
        </section>
        <section className="right-container card">
          {!state && <Events events={user.rsvpdEvents} eventTitle={"Event you're Attending"} type={"card"} handleClick={handleClick} />}
        </section>

      </section>
    </div>
  )
};

export default UserProfile;

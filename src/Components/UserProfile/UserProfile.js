import React, {useState} from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_PROFILE_INFO, DELETE_EVENT } from "../../queries";
import "./UserProfile.css";
import EventModal from "../EventModal/EventModal";
import Events from "../Events/Events";
import LoadingPage from "../LoadingPage/LoadingPage";
import Error from "../Error";

const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [eventId, setEventId] = useState()

  const { state } = useLocation()
  const id = state?.hostId ? state?.hostId : state?.userId

  let title = state?.hostId ? "They" : "You've"

  const {loading, error, data, refetch} = useQuery(GET_USER_PROFILE_INFO, {
    variables: {"id": id}
  })

  const [deleteEvent, deleteResponse] = useMutation(DELETE_EVENT)

  if(loading) return <LoadingPage />
  if(error) return <Error message={error.message} />

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
    refetch({variables: {"id": process.env.REACT_APP_USER_ID}})
  }

  const rsvpd = () => {
    const eventFound = data.user.rsvpdEvents.find(ev => ev.id === eventId)
    return eventFound ? true : false
  }

  const editProfile = () => {
    return (
      <Link to="/update-profile">
        <div className="update-profile-link">
          <span className="material-symbols-outlined">edit</span>
          <p className="edit-profile">Edit Profile</p>
        </div>
      </Link>
    );
  };

  const userTags = data?.user?.userTags.map((string) => {
    return ( 
      <div className='tag-title'>
        <p>{string.title}</p>
      </div>
     )
  });

  return (
    <div className="user-profile-page">
      {modalVisible && <EventModal userId={data.user.id} eventId={eventId} visible={modalVisible} handleClose={closeModal} isRsvpd={rsvpd()} />}
      {state?.userId && editProfile()}
      <section className="top-container">
        <section className="left-container">
          <div className="name-wrapper">
            <h2 className="family-name">{data.user.userName}</h2>
          </div>
          <img className="profile-picture" src={data.user.image} alt="family profile"></img>
          <div className="location-wrapper">
            <div className="material-symbols-outlined">pin_drop</div>
            <h3 className="location">{data.user.zipCode}</h3>
          </div>
        </section>
        <section className="right-container">
          <p className="description-text-box">{data.user.description}</p>
          <div className="tag-container">
            {userTags}
          </div>
        </section>
      </section>
      <section className="bottom-container">
        <section className="left-container card">
          <Events events={data.user.userEvents} eventTitle={`Event ${title} Created`} type={"card"} userEvent={true} handleClick={handleClick} deleteClick={deleteClick}/>
        </section>
        <section className="right-container card">
          {state?.userId && <Events events={data.user.rsvpdEvents} eventTitle={"Event You're Attending"} type={"card"} handleClick={handleClick} />}
        </section>
      </section>
    </div>
  )
};

export default UserProfile;

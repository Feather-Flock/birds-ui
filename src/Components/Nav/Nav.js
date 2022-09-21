import React, { useContext } from 'react'
import { Link, Route } from "react-router-dom";
import "./Nav.css"
import logo from '../../FlamingoFam.jpg'
import { useLocation } from "react-router";
import UserContext from '../../Context/UserContext';

const Nav = ({ refetch }) => {
  const user = useContext(UserContext)
  const location = useLocation()
  const currentUserProfile = () => {
    if(location.state === undefined && location.pathname === "/profile") {
      return 1
    } else if ((!!location.state && location.pathname === "/profile") || location.pathname === "/new-event") {
      return 2
    } else {
      return 3
    }
  }

  const dashboardButton = () => {
    return (
      <Link to="/">
        <button className="radiant-button">Dashboard</button>
      </Link>
    )
  }

  const profileButton = () => {
    return (
      <Link to="/profile">
        <button className="radiant-button" onClick={() => refetch()}>View Profile</button>
      </Link>
    )
  }

  const createEventButton = () => {
    return (
      <Link to="/new-event">
        <button className="radiant-button">Create Event</button>
      </Link>
    )
  }

  return (
    <nav className="nav-bar">
      <div className="logo-name">
        <img className="logo" src={logo} alt='rainbow flamingo family'/>
        <h2 className="boaf">Birds of a Feather</h2>
      </div>
      <div className="site-nav">
        {currentUserProfile() === 1 && dashboardButton() }
        {currentUserProfile() === 2 && 
          <>
            {dashboardButton()}
            {profileButton()}
          </>
        }
        {currentUserProfile() === 3 && profileButton()}
        {location.pathname !== "/new-event" && createEventButton()}
        <Route exact path="/Dashboard-List">
          <Link className="view-link" to="/">
            <button className="radiant-button">Map View</button>
          </Link>
        </Route>
        <Route exact path="/">
          <Link to="/Dashboard-List">
              <button className="radiant-button">List View</button>
          </Link>
        </Route>
      </div>
    </nav>
  )
}

export default Nav
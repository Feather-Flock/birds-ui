import React, { useContext } from 'react'
import { NavLink, Link, Route } from "react-router-dom";
import "./Nav.css"
import logo from '../../FlamingoFam.jpg'
import { useLocation } from "react-router";
import UserContext from '../../Context/UserContext';

const Nav = ({ refetch }) => {
  const user = useContext(UserContext)
  const location = useLocation()
  const activeStyle = {
    padding: '70%',
  }
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
      <NavLink to="/" style={({isActive}) =>
    isActive ? activeStyle : undefined }>
        <button className="radiant-button">Dashboard</button>
      </NavLink>
    )
  }

  const profileButton = () => {
    return (
      <NavLink to={{pathname: "/profile", state: {userId: user.id}}} style={({isActive}) =>
    isActive ? activeStyle : undefined }>
        <button className="radiant-button" onClick={() => refetch()}>View My Profile</button>
      </NavLink>
    )
  }

  const createEventButton = () => {
    return (
      <NavLink to="/new-event" style={({isActive}) =>
    isActive ? activeStyle : undefined }>
        <button className="radiant-button">Create Event</button>
      </NavLink>
    )
  }

  return (
    <nav className="nav-bar">
      <Link to='/'>
        <div className="logo-name">
          <img className="logo" src={logo} alt='rainbow flamingo family'/>
          <h1 className="boaf">Birds of a Feather</h1>
        </div>
      </Link>
      <div className="site-nav">
        {currentUserProfile() === 1 && dashboardButton() }
        {currentUserProfile() === 2 &&
          <>
            {dashboardButton()}
            {/* {profileButton()} */}
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

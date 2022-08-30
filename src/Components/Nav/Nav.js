import React from 'react'
import { Link } from "react-router-dom";
import "./Nav.css"

const Nav = () => {
  return (
    <nav className="nav-bar">
      <Link to="/profile">
      <button className="view-profile-button" role="button">View Profile</button>
      </Link>
      <Link to="/new-event">
        <button className="create-event-button" role="button">Create Event</button>
      </Link>
    </nav>
  )
}

export default Nav
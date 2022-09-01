import React from 'react'
import { Link } from "react-router-dom";
import "./Nav.css"

const Nav = () => {
  return (
    <nav className="nav-bar">
      <Link to="/profile">
      <button className="radiant-button" role="button">View Profile</button>
      </Link>
      <Link to="/new-event">
        <button className="radiant-button" role="button">Create Event</button>
      </Link>
      <Link to="/Dashboard-List">
          <button className="radiant-button" role="button">List View</button>
      </Link>
    </nav>
  )
}

export default Nav
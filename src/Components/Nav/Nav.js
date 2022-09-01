import React from 'react'
import { Link, Route } from "react-router-dom";
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
      <Route exact path="/new-event">
        <Link className="view-link" to="/">
          <button className="radiant-button" role="button">Dashboard</button>
        </Link>
      </Route>
      <Route exact path="/profile">
        <Link className="view-link" to="/">
          <button className="radiant-button" role="button">Dashboard</button>
        </Link>
      </Route>
      <Route exact path="/Dashboard-List">
        <Link className="view-link" to="/">
          <button className="radiant-button" role="button">Map View</button>
        </Link>
      </Route>
      <Route exact path="/">
        <Link to="/Dashboard-List">
            <button className="radiant-button" role="button">List View</button>
        </Link>
      </Route>
    </nav>
  )
}

export default Nav
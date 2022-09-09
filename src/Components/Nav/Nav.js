import React from 'react'
import { Link, Route } from "react-router-dom";
import "./Nav.css"
import { BsArrowLeft } from 'react-icons/bs'
import { IconContext } from "react-icons";
import logo from '../../FlamingoFam.jpg';

const Nav = () => {
  return (
    <nav className="nav-bar">
      <div className="logo-name">
        <img className="logo" src={logo} alt='rainbow flamingo family'/>
        <h2 className="boaf">Birds of a Feather</h2>
      </div>
      <div className="back-nav">
        <Route exact path="/new-event">
          <Link className="view-link" to="/">
            <IconContext.Provider value={{ color: 'white', size: '20px' }}>
              <button className="radiant-button"><BsArrowLeft /></button>
            </IconContext.Provider>
          </Link>
        </Route>
        <Route exact path="/profile">
          <Link className="view-link" to="/">
            <IconContext.Provider value={{ color: 'white', size: '20px' }}>
              <button className="radiant-button"><BsArrowLeft /></button>
            </IconContext.Provider>
          </Link>
        </Route>
      </div>
      <div className="site-nav">
        <Link to="/profile">
        <button className="radiant-button">View Profile</button>
        </Link>
        <Link to="/new-event">
          <button className="radiant-button">Create Event</button>
        </Link>
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
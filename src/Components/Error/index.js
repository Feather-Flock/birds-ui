import React from 'react'
import "./error.css"
import { Link } from 'react-router-dom'

const Error = ({ message }) => {
  return (
    <div>
      <div>
        <header className="top-header">
        </header>
        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>
        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>
        <section className="error">
          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title">OOPS!</h1>
              <p className="message__text">Something went wrong!</p>
            </div>
            <div className="error__nav e-nav">
              <Link to="/profile" className="e-nav__link">Visit Profile</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Error
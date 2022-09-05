import React from 'react'
import "./Footer.css";

const Footer = () => {
	return(
		<footer className="footer-container">
			<div className="right-footer">
				<h4 className="footer-header">FrontEnd Team:</h4>
        <div className="member-links">
				  <p className="group-names">Blue Nealis:</p>
          <a className="creds" href="https://github.com/">GitHub </a> 
          <a className="creds" href="https://www.linkedin.com/in/">LinkedIn </a>
        </div>
        <div className="member-links">
          <p className="group-names">Amber Bodnar:</p>
          <a className="creds" href="https://github.com/">GitHub </a> 
          <a className="creds" href="https://www.linkedin.com/in/">LinkedIn </a>
        </div> 
        <div className="member-links">
          <p className="group-names">Trish Fox-Collis:</p>
          <a className="creds" href="https://github.com/tfoxcollis">GitHub </a> 
          <a className="creds" href="https://www.linkedin.com/in/trish-fox-collis/">LinkedIn </a>
        </div>
			</div>
      <div className="left-footer">
				<h4 className="footer-header">BackEnd Team:</h4>
        <div className="member-links">
				  <p className="group-names">Deannah Burke:</p>
          <a className="creds" href="https://github.com/">GitHub </a> 
          <a className="creds" href="https://www.linkedin.com/in/">LinkedIn </a>
        </div> 
        <div className="member-links">
          <p className="group-names">Clay Ash:</p>
          <a className="creds" href="https://github.com/">GitHub </a> 
          <a className="creds" href="https://www.linkedin.com/in/">LinkedIn </a>
        </div> 
        <div className="member-links">
          <p className="group-names">Ian Ross:</p>
          <a className="creds" href="https://github.com/">GitHub </a> 
          <a className="creds" href="https://www.linkedin.com/in/">LinkedIn </a>
        </div> 
        <div className="member-links">
          <p className="group-names">Luke Pascale:</p>
          <a className="creds" href="https://github.com/">GitHub </a> 
          <a className="creds" href="https://www.linkedin.com/in/">LinkedIn </a>
        </div> 
			</div>
		</footer>
	)
}

export default Footer 
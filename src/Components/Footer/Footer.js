import React from 'react'
import "./Footer.css";

const Footer = () => {
	return(
		<footer className="footer-container">
      <table className="left-footer">
        <tr>
          <th>
            <h4 className="footer-header">FrontEnd Team:</h4>
          </th>
        </tr>
        <tr>
          <div className="member-links">
            <td><p className="group-names">Blue Nealis:</p></td>
            <td><a className="creds" href="https://github.com/BlueNealis">GitHub </a> </td>
            <td><a className="creds" href="https://www.linkedin.com/in/blue-nealis/">LinkedIn </a></td>
          </div>
        </tr>
        <tr>
          <div className="member-links">
            <td><p className="group-names">Amber Bodnar:</p></td>
            <td><a className="creds" href="https://github.com/abodnar1">GitHub </a> </td>
            <td><a className="creds" href="https://www.linkedin.com/in/amberbodnar/">LinkedIn </a></td>
          </div> 
        </tr>
        <tr>
          <div className="member-links">
            <td><p className="group-names">Trish Fox-Collis:</p></td>
            <td><a className="creds" href="https://github.com/tfoxcollis">GitHub </a> </td>
            <td><a className="creds" href="https://www.linkedin.com/in/trish-fox-collis/">LinkedIn </a></td>
          </div>
        </tr>
      </table>

      <table className="right-footer">
        <tr>
          <th>
				    <h4 className="footer-header">BackEnd Team:</h4>
          </th>
        </tr>
        <tr>
          <div className="member-links">
            <td><p className="group-names">Deannah Burke:</p></td>
            <td><a className="creds" href=" https://github.com/deannahburke">GitHub </a> </td>
            <td><a className="creds" href=" linkedin.com/in/deannah-burke/">LinkedIn </a></td>
          </div> 
        </tr>
        <tr>
          <div className="member-links">
            <td><p className="group-names">Clay Ash:</p></td>
            <td><a className="creds" href="https://github.com/clayAsh">GitHub </a> </td>
            <td><a className="creds" href="https://www.linkedin.com/in/clay-ash-b4422b188/">LinkedIn </a></td>
          </div> 
        </tr>
        <tr>
          <div className="member-links">
            <td><p className="group-names">Ian Ross:</p></td>
            <td><a className="creds" href="https://github.com/ross-ian28">GitHub </a> </td>
            <td><a className="creds" href="https://www.linkedin.com/in/ross-ian28/">LinkedIn </a></td>
          </div>
        </tr> 
        <tr>
          <div className="member-links">
            <td><p className="group-names">Luke Pascale:</p></td>
            <td><a className="creds" href="https://github.com/enalihai">GitHub </a> </td>
            <td><a className="creds" href="https://www.linkedin.com/in/luke-pascale/">LinkedIn </a></td>
          </div> 
        </tr>
			</table>
		</footer>
	)
}

export default Footer 
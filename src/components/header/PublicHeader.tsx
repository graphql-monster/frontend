import React from 'react'
import { Link } from 'react-router-dom'

export const PublicHeader = () => {
    return ( <div className="header-light transparent scroll-light container">
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex justify-content-between">
          <div className="align-self-center header-col-left">
            <div id="logo">
              <a href="/">
                <img alt="" src="logoPQL2.png" />
              </a>
            </div>
          </div>
          <div className="align-self-center ml-auto header-col-mid">

            <ul id="mainmenu">
              <li>
                <a href="/">Home</a>  
              </li>
              
            </ul>
          </div>
          <div className="align-self-center ml-auto header-col-right">
            &nbsp;&nbsp;<Link className="" to="/login">Login</Link> or <Link className="" to="/register">Register</Link>
                                  <span id="menu-btn"></span>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  </div>)
}
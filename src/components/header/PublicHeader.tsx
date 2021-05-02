import React from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Header.css'
import Logo from './Logo'

export const PublicHeader = () => ( <div className="header-light transparent scroll-light container">
     <div className="header-light transparent scroll-light container">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-between">
            <div className="align-self-center header-col-left">
              <Logo />
            </div>
            <div className="align-self-center ml-auto header-col-mid">
              <ul id="mainmenu">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/pricing">Pricing</a>
                </li>
                <li>
                  <a href="/documentation">Documentation</a>
                  <ul>
                    <li><a href="/documentation#model">Model</a></li>
                    <li><a href="/documentation#fields">Fields</a></li>
                    <li><a href="/documentation#relations">Relations</a></li>
                    <li><a href="/documentation#model-permissions">Model Permissions</a></li>
                  </ul>
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
    </div>
    </div>)



export default PublicHeader
import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Logo from './Logo'

const UserHeader = ({user, onLogout}:any) =>  ( <div className="header-light transparent scroll-light container">
<div className="row">
  <div className="col-md-12">
    <div className="d-flex justify-content-between">
      <div className="align-self-center header-col-left">
        <Logo />
      </div>
      <div className="align-self-center ml-auto header-col-mid">
        <ul id="mainmenu">
          <li>
            <Link to="/user/projects">Projects</Link>
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
      <ul id="mainmenu">
                <li>
                  <Link to="/user/info">User</Link>
                  <ul>
                    <li><Link to="/user/info" >User Info</Link></li>
                    <li><Link to="/login" onClick={onLogout}>Logout</Link></li>
                    
                  </ul>
                </li>
                </ul><span id="menu-btn"></span>
      </div>
      <div className="clearfix"></div>
    </div>
  </div>
</div>
</div>)

export default UserHeader
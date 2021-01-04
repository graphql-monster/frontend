import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'

const UserHeader = ({user, onLogout}:any) => {

    return (
        <div className="header-light transparent scroll-light container">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-between">
            <div className="align-self-center header-col-left">
              <div id="logo">
                <a href="/user/projects">
                  <img alt="" src="logoPQL2.png" />
                </a>
              </div>
            </div>
            <div className="align-self-center ml-auto header-col-mid">

              <ul id="mainmenu">
                <li>
                  <a href="/user/projects">Projects</a>
                  {/* <ul>
                    <li><a href="index.html">Main</a></li>
                    <li><a href="index-startup.html">Startup</a></li>
                    <li><a href="index-coworking.html">Co-working</a></li>
                    <li><a href="index-agency.html">Agency</a></li>
                    <li><a href="index-apps.html">Apps</a></li>
                  </ul> */}
                </li>
                <li>
                  <a href="/pricing">Pricing</a>
                  {/* <ul>
                    <li><a href="about-us.html">About Us</a></li>
                    <li><a href="our-team.html">Our Team</a></li>
                    <li><a href="our-history.html">Our History</a></li>
                    <li><a href="faq.html">FAQs</a></li>
                    <li><a href="careers.html">Careers</a></li>
                  </ul> */}
                </li>
                <li>
                <a href="/documentation">Documentation</a>
                  <ul>
                    <li><a href="/documentation#simple-model">Simple model</a></li>
                    <li><a href="/documentation#models-with-relation">Models with relation</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#">Administration</a>
                  <ul>
                    <li><a href="/admin/projects">All projects</a></li>
                    <li><a href="/admin/subsribes">All subsribes</a></li>
                    <li><a href="/admin/users">All users</a></li>
                    <li><a href="/admin/roles">All roles</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="align-self-center ml-auto header-col-right">
              <Link className="btn btn-primary btn-round" to="/login" onClick={onLogout}>Logout</Link>&nbsp;&nbsp;
                                    <span id="menu-btn"></span>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
    //     <div>
    //     <Nav>
    //         <Nav.Item>
    //         <Dropdown>
    //         <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
    //         User Menu
    //         </Dropdown.Toggle>

    //         <Dropdown.Menu>
    //         <Dropdown.Item href="/user/projects">All Projects</Dropdown.Item>
    //         <Dropdown.Divider />
    //         <Dropdown.Item href="#/action-2">User</Dropdown.Item>
    //         <Dropdown.Item href="#/action-3" onClick={onLogout}>Logout</Dropdown.Item>
    //         </Dropdown.Menu>
    //     </Dropdown>
    //     </Nav.Item>
        
    //     <Nav.Item>
        
    //     <Dropdown>
    //         <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
    //         Admin
    //         </Dropdown.Toggle>

    //         <Dropdown.Menu>
    //         <Dropdown.Item href="/admin/projects">All Projects</Dropdown.Item>
    //         <Dropdown.Item href="/admin/users">All Users</Dropdown.Item>
    //         <Dropdown.Item href="/admin/roles">All Roles</Dropdown.Item>
    //         </Dropdown.Menu>
    //     </Dropdown>
    //     </Nav.Item>

    // </Nav>

    // </div>

    )
}

export default UserHeader
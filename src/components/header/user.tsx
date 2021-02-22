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
                <Link to="/user/projects">
                  <img alt="" src="logoPQL2.png" />
                </Link>
              </div>
            </div>
            <div className="align-self-center ml-auto header-col-mid">

              <ul id="mainmenu">
                <li>
                  <Link to="/user/projects">Projects</Link>
                  {/* <ul>
                    <li><Link to="index.html">Main</Link></li>
                    <li><Link to="index-startup.html">Startup</Link></li>
                    <li><Link to="index-coworking.html">Co-working</Link></li>
                    <li><Link to="index-agency.html">Agency</Link></li>
                    <li><Link to="index-apps.html">Apps</Link></li>
                  </ul> */}
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                  {/* <ul>
                    <li><Link to="about-us.html">About Us</Link></li>
                    <li><Link to="our-team.html">Our Team</Link></li>
                    <li><Link to="our-history.html">Our History</Link></li>
                    <li><Link to="faq.html">FAQs</Link></li>
                    <li><Link to="careers.html">Careers</Link></li>
                  </ul> */}
                </li>
                <li>
                <Link to="/documentation">Documentation</Link>
                  <ul>
                    <li><a href="/documentation#model">Model</a></li>
                    <li><a href="/documentation#fields">Fields</a></li>
                    <li><a href="/documentation#relations">Relations</a></li>
                    <li><a href="/documentation#model-permissions">Model Permissions</a></li>
                  </ul>
                </li>
                <li>
                  <Link to="#">Administration</Link>
                  <ul>
                    <li><Link to="/admin/projects">All projects</Link></li>
                    <li><Link to="/admin/subsribes">All subsribes</Link></li>
                    <li><Link to="/admin/users">All users</Link></li>
                    <li><Link to="/admin/roles">All roles</Link></li>
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
                </ul>
              &nbsp;&nbsp;
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
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useUserState, useUserDispatch, USER_INIT, USER_LOGOUT } from '../../contexts/userContext';
import UserHeaderComponent from './user'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import SignIn from '../../pages/login/SignIn';
import Register from '../../pages/login/Register';

export const Header = () => {
  const user = useUserState()
  const userDispatch = useUserDispatch()

  const [showSignIn, setShowSignIn] = useState<boolean>(false)
  const [showRegister, setShowRegister] = useState(true)

  const handleSignInClose = () => setShowSignIn(false)
  const handleSignInShow = () => setShowSignIn(true)

  const handleRegisterClose = () => setShowRegister(false)
  const handleRegisterShow = () => setShowRegister(true)

  const onLogout = () => {
    userDispatch({ type: USER_LOGOUT })
  }

  if (user.token) {
    return <UserHeaderComponent user={user} onLogout={onLogout} />
  }

  return (
    <div className="header-light transparent scroll-light container">
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
            
              </ul>
            </div>
            <div className="align-self-center ml-auto header-col-right">
              &nbsp;&nbsp;<Link className="btn btn-primary btn-round" to="/login">Login</Link>
                                    <span id="menu-btn"></span>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
    // <div>

    //   <span onClick={handleSignInShow}>SignIn</span> | <span onClick={handleRegisterShow}>Register</span> |
    //   <Link to="/">Home</Link> |
    //   <Link to="/pricing">Pricing</Link>

    //   <SignIn show={showSignIn} onHide={handleSignInClose}/>
    //   <Register show={showRegister} onHide={handleRegisterClose}/>

    //   <span>{process.env.PROTECTQL_HOST}</span>


    // </div>
  )
}
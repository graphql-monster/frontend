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
                  <ul>
                    <li><a href="index.html">Main</a></li>
                    <li><a href="index-startup.html">Startup</a></li>
                    <li><a href="index-coworking.html">Co-working</a></li>
                    <li><a href="index-agency.html">Agency</a></li>
                    <li><a href="index-apps.html">Apps</a></li>
                  </ul>
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
                  <a href="#">Services</a>
                  <ul>
                    <li><a href="service-single.html">Service Single</a></li>
                    <li><a href="services-image.html">Services Images</a></li>
                    <li><a href="services-icon.html">Services Icon</a></li>
                    <li><a href="services-icon-boxed.html">Services Icon Boxed</a></li>
                    <li><a href="services-carousel.html">Services Carousel</a></li>
                    <li><a href="pricing-plans.html">Pricing Plans</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#">Pages</a>
                  <ul>
                    <li><a href="news.html">News</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="login.html">Login</a></li>
                    <li><a href="login-2.html">Login 2</a></li>
                    <li><a href="register.html">Register</a></li>
                    <li><a href="contact-us.html">Contact Us</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#">Elements</a>
                  <ul>
                    <li><a href="icons-font-awesome.html">Font Awesome Icons</a></li>
                    <li><a href="icons-elegant.html">Elegant Icons</a></li>
                    <li><a href="icons-etline.html">Etline Icons</a></li>
                    <li><a href="alerts.html">Alerts</a></li>
                    <li><a href="accordion.html">Accordion</a></li>
                    <li><a href="modal.html">Modal</a></li>
                    <li><a href="progress-bar.html">Progress Bar</a></li>
                    <li><a href="tabs.html">Tabs</a></li>
                    <li><a href="tabs.html">Timeline</a></li>
                    <li><a href="counters.html">Counters</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="align-self-center ml-auto header-col-right">
              <Link className="btn btn-primary btn-round" to="/login">Login</Link>&nbsp;&nbsp;
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
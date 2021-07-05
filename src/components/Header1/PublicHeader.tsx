import React from 'react'
import { Button, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Header.css'
import Logo from './Logo'

export const PublicHeader = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Graphql Monster (beta)</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/pricing">Pricing</Nav.Link>
        <NavDropdown title="Documentation" id="basic-nav-dropdown">
          <NavDropdown.Item href="/documentation#model">Model</NavDropdown.Item>
          <NavDropdown.Item href="/documentation#fields">Fields</NavDropdown.Item>
          <NavDropdown.Item href="/documentation#relations">Relations</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/documentation#model-permission">Model Permissions</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav className="mr-left">
        <Link className="" to="/login">Login</Link> or <Link className="" to="/register">Register</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default PublicHeader
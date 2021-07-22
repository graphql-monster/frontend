import React, { useCallback } from 'react'
import { Button, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavDropdownItem from '../NavDropdownItem/NavDropdownItem'
import NavLink from '../NavLink/NavLink'

import './Header.css'
import Logo from './Logo'

export const PublicHeader = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Graphql Monster (beta)</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink to="/pricing">Pricing</NavLink>
        <NavDropdown title="Documentation" id="basic-nav-dropdown">
          <NavDropdownItem to="/documentation/schema-description">Schema description</NavDropdownItem>
          <NavDropdownItem to="/documentation/obtain-token">Obtain token</NavDropdownItem>
          <NavDropdownItem to="/documentation/todo-app">Create Todo App Typescript</NavDropdownItem>
        </NavDropdown>
      </Nav>
      <Nav className="mr-left">
        <Link className="" to="/login">
          Login
        </Link>{' '}
        or{' '}
        <Link className="" to="/register">
          Register
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default PublicHeader

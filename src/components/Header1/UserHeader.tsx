import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Logo from './Logo'
import { Navbar, NavDropdown } from 'react-bootstrap'
import NavDropdownItem from '../NavDropdownItem/NavDropdownItem'
import NavLink from '../NavLink/NavLink'

const UserHeader = ({ user, onLogout }: any) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Graphql Monster (beta)</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink to="/user/projects">Projects</NavLink>
        <NavDropdown title="Documentation" id="basic-nav-dropdown">
          <NavDropdownItem to="/documentation/schema-description">Schema description</NavDropdownItem>
          <NavDropdownItem to="/documentation/obtain-token">Obtain token</NavDropdownItem>
        </NavDropdown>
      </Nav>
      <Nav className="mr-left">
        <NavDropdown title="User" id="basic-nav-dropdown">
          <NavDropdown.Item href="/user/info">User Info</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/login" onClick={onLogout}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default UserHeader

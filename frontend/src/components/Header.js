import React from 'react'
import {Navbar, Nav} from "react-bootstrap"

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="#home">Anlayış Satranç Akademi</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link href="#tutors" className='nav-item'>Kadromuz</Nav.Link>
        <Nav.Link href="#footer" className='nav-item'>İletişim</Nav.Link>
        <Nav.Link href="#pricing" className='nav-item'>Fiyatlandırma</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Header
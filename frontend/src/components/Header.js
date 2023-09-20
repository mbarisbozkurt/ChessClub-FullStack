import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'; 

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/">Anlayış Satranç Akademi</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link href="#eğitmenler" className='nav-item'>Eğitmenler</Nav.Link>
        <Nav.Link href="#footer" className='nav-item'>İletişim</Nav.Link>
        {/* <LinkContainer to="login">
          <Nav.Link>
            <FaUser className='login'/>Üye Girişi/Üye Ol
          </Nav.Link>
        </LinkContainer> */}
        <LinkContainer to="login">
          <Nav.Link>
            <Button className='header-button' variant='primary'>Üye Girişi/Üye Ol</Button>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Header
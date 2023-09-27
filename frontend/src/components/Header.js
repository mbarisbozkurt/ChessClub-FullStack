import React from 'react'
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'; 
import { FaUser } from "react-icons/fa"

import { useSelector, useDispatch } from "react-redux"; //to be able to get something from local storage
import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../slices/usersApiSlice'; //for backend request
import { logout } from '../slices/authSlice'; //for frontend (localstorage) update

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo); //from local storage (authSlice.js)
  const [logoutBackendApiCall] = useLogoutMutation(); //for backend request

  const logoutHandler = async() => {
    try {
      //make a post request to: http://localhost:5000/api/users/logout in the userController
      await logoutBackendApiCall().unwrap();

      //clear local storage
      dispatch(logout());

      //navigate
      navigate("/login");

   } catch (error) {
      console.log(error);
   }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/">Anlayış Satranç Akademi</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link href="#eğitmenler" className='nav-item'>Eğitmenler</Nav.Link>
        <Nav.Link href="#footer" className='nav-item'>İletişim</Nav.Link>

        {/*If there is a user*/}
        {userInfo ? 
          (<NavDropdown title={<><FaUser className='mb-1'/> {userInfo.name}</>} id="username"> 
            <LinkContainer to="/profile">
                <NavDropdown.Item>Profil</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/logout">
                <NavDropdown.Item onClick={logoutHandler}>Çıkış Yap</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>)
          :
          (<LinkContainer to="login">
            <Nav.Link>
              <Button className='header-button' variant='primary'>Üye Girişi/Üye Ol</Button>
            </Nav.Link>
          </LinkContainer>)
        }

      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Header
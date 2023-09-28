import React from 'react'
import { Nav } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav className='justify-content-center mt-3'>
      <Nav.Item className='checkout-process-nav-item'>
        {step1 ? 
        (<LinkContainer to="/login">
            <Nav.Link className='checkout-step-names'>Üye Ol</Nav.Link>
        </LinkContainer>)  
        : 
        (<Nav.Link disabled className='checkout-step-names'>Üye Ol</Nav.Link>)}
      </Nav.Item>

      <Nav.Item className='checkout-process-nav-item'>
        {step2 ? 
        (<LinkContainer to="/shipping">
            <Nav.Link className='checkout-step-names'>Adres</Nav.Link>
        </LinkContainer>)  
        : 
        (<Nav.Link disabled className='checkout-step-names'>Adres</Nav.Link>)}
      </Nav.Item>

      <Nav.Item className='checkout-process-nav-item'>
        {step3 ? 
        (<LinkContainer to="/info">
            <Nav.Link className='checkout-step-names'>Ders Bilgileri</Nav.Link>
        </LinkContainer>)  
        : 
        (<Nav.Link disabled className='checkout-step-names'>Ders Bilgileri</Nav.Link>)}
      </Nav.Item>

      <Nav.Item className='checkout-process-nav-item'>
        {step4 ? 
        (<LinkContainer to="/placeorder">
            <Nav.Link className='checkout-step-names'>Ödeme</Nav.Link>
        </LinkContainer>)  
        : 
        (<Nav.Link disabled className='checkout-step-names'>Ödeme</Nav.Link>)}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
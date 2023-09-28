import React from 'react'
import { useState } from 'react';
import {Form, Button} from "react-bootstrap";
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/orderInfoSlice';

//address, city, postalCode, country
const ShippingScreen = () => {

  //get the shippingAddress state
  const shippingAddress = useSelector((state) => state.orderInfo.shippingAddress);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(saveShippingAddress({address, city, postalCode})); //update shippingAddress state
    navigate("/info");
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1 className='mt-4'>Fatura Adresi</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='Address' className='my-3'>
          <Form.Label>Adres</Form.Label>
          <Form.Control type="text" placeholder='Adresinizi girin' value={address} onChange={(e) => setAddress(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId='City' className='my-3'>
          <Form.Label>Şehir</Form.Label>
          <Form.Control type='text' placeholder='Şehir girin' value={city} onChange={(e) => setCity(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId='PostalCode' className="my-3">
          <Form.Label>Posta Kodu</Form.Label>
          <Form.Control type='text' placeholder='Posta Kodu girin' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </Form.Group>

        <Button type='submit' className='mt-4' variant='primary'>Devam Et</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen;
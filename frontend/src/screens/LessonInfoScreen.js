import React from 'react'
import { useState, useEffect } from 'react'
import {Row, Col, Button, ListGroup, ListGroupItem, Dropdown} from "react-bootstrap";
import CheckoutSteps from '../components/CheckoutSteps';
import {toast} from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useCreateOrderMutation } from '../slices/ordersApiSlice';

const LessonInfoScreen = () => {

  const navigate = useNavigate();

  const [lessonType, setlessonType] = useState("Yüz Yüze");

  /*order(lesson) info taken from orderInfoSlice*/
  const teacherName = useSelector((state) => state.orderInfo.teacherInfo.name);
  const price = useSelector((state) => state.orderInfo.price);

  //get the createOrder function from apiSlice for interacting with backend
  const [createOrder, {isLoading, error}] = useCreateOrderMutation();

  //if there is no shipping address in the state, then user should be redirected to /shipping
  const shippingAddress = useSelector((state) => state.orderInfo.shippingAddress);
  useEffect(() => {
    if(!shippingAddress.address){
      navigate("/shipping");
    }
  }, [shippingAddress.address, navigate])

  //console.log(lessonType);
  //console.log(shippingAddress);
  //console.log(price);

  /******************************************************************/
  const createOrderHandler = async () => {
    try {
        //send the order items to backend and get the response from there
        const res = await createOrder({
          teacherName: teacherName,
          lessonType: lessonType, //check redux in the browser
          shippingAddress: shippingAddress,
          paymentMethod: "PayPal",
          price: price,
        }).unwrap();

        console.log(res);

        //to this after payment
        //dispatch(clearOrderItems());

        //navigate
        navigate(`/payment/${res._id}`);

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row className='justify-content-center py-3'>
        <Col md={6}>
          <Row>
            <ListGroup variant="flush">

              <ListGroupItem className='py-2'>
                <h4>Ders Türünü Seçin</h4>         
                <Dropdown className='my-3'>
                  <Dropdown.Toggle variant="primary" id="dropdown">
                    Seçiniz...
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setlessonType('Yüz Yüze')}> Yüz Yüze </Dropdown.Item>
                    <Dropdown.Item onClick={() => setlessonType('Online')}> Online </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroupItem>

              <ListGroupItem className='py-3'>
                <h4>Ders Bilgileriniz</h4>
                <p className='custom-paragraph mt-3'><strong>Eğitmen:</strong> {teacherName}</p>
                <p className='custom-paragraph'><strong>Ders Türü:</strong> {lessonType}</p> 
                <p className='custom-paragraph'><strong>Fiyat:</strong> {price}TL/AY</p> 
              </ListGroupItem>

              <ListGroupItem className='py-3'>
                <h4>Fatura Adresi</h4>             
                <strong>Adres:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}
                </ListGroupItem>

              <ListGroupItem className='py-3'>
                <h4>Ödeme Yöntemi</h4>
                <strong>Yöntem:</strong> PayPal / Kredi Kartı
              </ListGroupItem> 

              {error && <Message variant="danger"> {error.message} </Message>}

              <ListGroupItem className='py-3'>
                <Button type='button' className="btn btn-block" onClick={createOrderHandler}>Devam Et</Button>
              </ListGroupItem>

              {isLoading && <Loader/>}
            
            </ListGroup>            
          </Row>
        </Col>
      </Row>
    </>
  )
}



export default LessonInfoScreen
import React from 'react'
import {useParams} from "react-router-dom";
import {Row, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useSendEmailMutation } from "../slices/ordersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js"
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {

  //get the orderId from the url
  const {id: orderId} = useParams();

  //get the data from the backend by using the orderId
  const{data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId);
  //console.log(order);

  //typical redux queries
  const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation();
  const [sendEmail, {isLoading: loadingEmail}] = useSendEmailMutation();
  const {userInfo} = useSelector((state) => state.auth);
  
  //paypal
  const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
  const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery();

  //CHOOSE "PAY WITH DEBIT OR CREDIT CARD or CREATE AN ACCOUNT" option, enter the fields, click "continue as guests"
  //THEN, CHECK COMPASS: isPaid should be true and paymentResult should be valid
  //FOR CREDIT CARD PAYMENTS: CHOOSE THE USA AS A COUNTRY SINCE TURKEY IS NOT VALID FOR PAYPAL
  useEffect(() => {
    if(!errorPayPal && !loadingPayPal && paypal.clientId){
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "clientId": paypal.clientId,
            currency: "USD",
          }
        });
        paypalDispatch({type: "setLoadingStatus", value: "pending"});
      }
      if(order && !order.isPaid){
        if(!window.paypal){
          loadPayPalScript();
        }
      } 
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    //trigger paypal, use it as it is
    return actions.order.capture().then(async function(details){
      try {
        await payOrder({orderId, details});
        await sendEmail(order);
        refetch(); //UI da direkt "paid" yazması için
        toast.success("Ödeme başarılı!");

      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: Number((order.price * (0.1841812)).toFixed(2)), 
          },
        },
      ],
    }).then((orderId) => {
      return orderId;
    })
  }

  return (
    isLoading ? <Loader/> : error ? <Message variant="danger"/> : 
    (
      <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row className='justify-content-center py-3'>
          <Col md={6}>
          <ListGroup variant='flush'>

              <ListGroupItem className='mt-4'>
                <h4>Fatura Bilgileri</h4>
                <p className='custom-paragraph mt-3'><strong>İsim:</strong> {order.user.name}</p>
                <p className='custom-paragraph'><strong>E-posta:</strong> {order.user.email}</p>
                <p className='custom-paragraph'>
                  <strong>Adres: </strong> 
                  {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p className='custom-paragraph'><strong>Fiyat:</strong> {order.price}TL/AY</p>
                {order.isPaid && <Message variant="success">Şu tarihte ödeme yapıldı: {order.updatedAt}</Message>}
                {!order.isPaid && <Message variant="danger">Ödeme Yapılmadı</Message>}
              </ListGroupItem>

              <ListGroupItem>
                {!order.isPaid && <h4 className='my-4'>Paypal ya da Kredi Kartı ile Ödeme Yap</h4>}
                {!order.isPaid && !userInfo.isAdmin && (
                    <>
                      {loadingPay && <Loader />}
                      {isPending && <Loader />}
                      {loadingEmail && <Loader/>} 
                      <div>
                          {/* <Button onClick={onApproveTest} style={{marginBottom: "20px"}}>Complete Order </Button> */}
                          <div style={{ width: '475px' }}>
                              <PayPalButtons
                                  createOrder={createOrder}
                                  onApprove={onApprove}
                                  onError={onError}
                              ></PayPalButtons>
                              {/* <PayPalButtons onClick={onApproveTest} /> */}
                          </div>
                      </div>
                    </>
                )}
                {order.isPaid && <h2 className='mt-5'>Satranç Öğrenmeye Hazır Mısın?</h2>}
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </>
    )
  )
}

export default PaymentScreen;
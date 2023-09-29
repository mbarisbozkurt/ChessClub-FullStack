import React from 'react'
import {useState, useEffect} from "react";
import {Table, Form, Button, Row, Col, FormGroup, FormLabel, FormControl} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {toast} from "react-toastify";
import {FaTimes} from "react-icons/fa"

import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';


const ProfileScreen = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
  const {data: orders, isLoading, error} = useGetMyOrdersQuery();
  //console.log(orders);

  //whenever userInfo is changed, also update here
  useEffect(() => {
    if(userInfo){
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email])

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      toast.error("Şifreler eşleşmiyor!")
    }else{
      try {
        //1)Backend: get the response from the backend and get the updatedData as response
        const res = await updateProfile({_id: userInfo._id, name, email, password}).unwrap();
  
        //2)Frontend: update the frontend (userInfo in the authSlice)
        dispatch(setCredentials(res));
        toast.success("Profil güncellendi!");
  
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  }

  return (
    <Row className='justify-content-center mt-3'>
      <Col md={4} className='mt-4'>  
          <Form onSubmit={onSubmitHandler}>
            <h3 className='my-3'>Kullanıcı Bilgileri</h3>

            <FormGroup controlId='username' className='my-3'>
              <FormLabel>İsim</FormLabel>
              <FormControl type="name" placeholder='İsim girin' value={name} onChange={(e)=> setName(e.target.value)}/>
            </FormGroup>

            <FormGroup controlId='email'className='my-3'>
              <FormLabel>E-posta adresi</FormLabel>
              <FormControl type= "email" placeholder = "E-posta girin" value= {email} onChange={(e) => setEmail(e.target.value)} autocomplete="off"/>
            </FormGroup>

            
            <FormGroup controlId='password' className='my-3'>
              <FormLabel>Şifre</FormLabel>
              <FormControl type= "password" placeholder = "Şifre girin" value= {password} onChange={(e) => setPassword(e.target.value)} autocomplete="off"/>
            </FormGroup>

            
            <FormGroup controlId='confirmPassword' className='my-3'>
              <FormLabel>Yeni Şifreyi Onaylayın</FormLabel>
              <FormControl type= "password" placeholder = "Şifreyi onaylayın" value= {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autocomplete="off"/>
            </FormGroup>

            <Button type='submit' className='mt-3'>Bilgilerimi Güncelle</Button>
            {loadingUpdateProfile && <Loader/>}
          </Form>   
      </Col>

      <Col md={5} className='mt-3' style={{marginLeft: "100px"}}>
        <h3 className='my-3'>Derslerim</h3>
          {isLoading && <Loader/>}
          {error && <Message variant="danger">{error?.data?.message || error?.error}</Message>}
          <Table striped hover responsive className='mt-1'>
            <thead>
              <tr>
                <th>DERSE KAYIT TARİHİ</th>
                <th>DERS TÜRÜ </th>
                <th>EĞİTMEN ADI</th>
                <th>FİYAT</th>
                <th>ÖDEME</th>
              </tr>
            </thead>

            <tbody>
              {orders && orders.map((order) => ( /* "orders &&" is important, it doesnt work otherwise */
                <tr key={order._id}>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>{order.lessonType}</td>
                  <td>{order.teacherName}</td>
                  <td>{order.price}TL</td>
                  <td>{order.isPaid && order.paidAt.substring(0,10)} {!order.isPaid && <FaTimes style={{color: "red"}}/>} </td>
                </tr>
              ))}
            </tbody>
          </Table>
      </Col>
    </Row>
  )
}

export default ProfileScreen;
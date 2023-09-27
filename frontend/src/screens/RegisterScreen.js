import React from 'react'
import {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {toast} from "react-toastify";

import { useRegisterMutation } from '../slices/usersApiSlice'; //for backend
import { setCredentials } from '../slices/authSlice'; //for frontend
import { useSelector, useDispatch } from 'react-redux'; //for frontend

const RegisterScreen = () => {

  const dispatch = useDispatch(); //for local storage
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //redirect to /shipping or home page 
  const {search} = useLocation(); 
  const sp = new URLSearchParams(search); 
  const redirect = sp.get("redirect") || "/"; //get whatever the value after "redirect" e.g: http://localhost:3000/login?redirect=/shipping

  const userInfo = useSelector((state) => state.auth.userInfo) //from frontend(authSlice) //state.name.initialState 

  //whenever userInfo or redirect changed, if there is a user navigate him/her to /shipping or "/" (home page)
  useEffect(()=> {
    if(userInfo){
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect])

  const [register, {isLoading}] = useRegisterMutation(); //from backend(apiSlice): to be able to make a post request to the backend


  /**********************************************************/
  const submitHandler = async(event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      toast.error("Şifreler aynı değil. Lütfen doğrulayın ve tekrar deneyin!");
      return;
    }else{
      try {
        //make a post request to: http://localhost:5000/api/users in the userController and get the response
        const res = await register({name, email, password}).unwrap();     
        
        //update frontend
        dispatch(setCredentials({...res}));

        //navigate 
        navigate(redirect); //redirect'den sonra "/" olduğu için homepage'e yönlendir
        
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  }
 
  return (
    <FormContainer> 
      <h1 className='my-3'>Üye Ol</h1> 
      <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3"> {/*margin y axis 3 (medium space)*/}
            <Form.Label>Adınız</Form.Label>
            <Form.Control type="text" placeholder="Adınızı girin" value={name} onChange={(e) => setName(e.target.value)}/> {/*input*/}
          </Form.Group>

          <Form.Group controlId="email" className="my-3"> {/*margin y axis 3 (medium space)*/}
            <Form.Label>E-posta</Form.Label>
            <Form.Control type="email" placeholder="E-posta girin" value={email} onChange={(e) => setEmail(e.target.value)}/> {/*input*/}
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Şifre</Form.Label>
            <Form.Control type="password" placeholder="Şifre girin" value={password} onChange={(e) => setPassword(e.target.value)}/> {/*input*/}
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Şifrenizi tekrarlayın</Form.Label>
            <Form.Control type="password" placeholder="Tekrar şifre girin" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/> {/*input*/}
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>Üye Ol</Button> {/*mt-2 margin top 2*/}
          {isLoading && <Loader/>}
      </Form>

      <Row className="py-5">
        <Col>
          Zaten Hesabınız Var Mı? {" "} <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}> Giriş Yapın</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen;
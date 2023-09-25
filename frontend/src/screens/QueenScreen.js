import React from 'react'
import {Row, Col, Image, Button} from "react-bootstrap"
import Loader from "../components/Loader.js"
import Message from '../components/Message.js'
import {useNavigate} from "react-router-dom"

import { useGetTeachersQuery } from '../slices/teachersApiSlice'

const Queen = () => {

  const {data: teachers, isLoading, error} = useGetTeachersQuery();

  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  }

  return (
    <>
      {isLoading && <Loader/>}
      {error && <Message variant="danger">{error?.data?.message || error.error}</Message>}
      <h3 id='rows' className='hosgeldiniz'>"Vezir" eğitim setine hoşgeldiniz.</h3>
      <h3 id='hosgeldiniz' className='hosgeldiniz'>Bu eğitim seti ile hafta başına 6 Saat grup dersi, 4 Saat özel ders alma imkanı bulacaksınız.</h3>

      {teachers && teachers.map((teacher, index) => (
        <Row id='rows' style={index % 2 === 0 ? {backgroundColor: "#B4E4FF"} : {}}>  
        <Col md={4} className='my-5'>
          <Row>
            <Image className="iso-photo photos" src={teacher.image}/>
          </Row>
          <Row>
            <h5 className='iso-name mt-3'>{teacher && teacher.name}</h5>
          </Row>
        </Col>

        <Col md={6} className='my-5 text-center'>
          <h4 className='mt-5'>{teacher && teacher.description}</h4>
          <h4 className='mt-5'>İletişim: {teacher && teacher.contact}</h4>
          <Button className='button-center my-3 btn-lg' variant='success' onClick={checkoutHandler}>Yüz Yüze/Online Ders Al</Button>
          <h4><em>{teacher && teacher.remainingPeopleForQueen} kişilik yer kaldı</em></h4>
        </Col>
      </Row>
      ))}
    </>
  )
}

export default Queen
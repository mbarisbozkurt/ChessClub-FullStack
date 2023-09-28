import React from 'react'
import {Row, Col, Image, Button} from "react-bootstrap"
import { FaExclamationCircle } from 'react-icons/fa';
import Loader from "../components/Loader.js"
import Message from '../components/Message.js'

import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";

import { setLessonInfo } from '../slices/orderInfoSlice.js'
import { useGetTeachersQuery } from '../slices/teachersApiSlice'

const Pawn = () => {

  const {data: teachers, isLoading, error} = useGetTeachersQuery();
  //console.log(teachers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkoutHandler = (teacher) => {
    dispatch(setLessonInfo({ price: 200, teacherInfo: teacher }));
    navigate("/login?redirect=/shipping"); /*Login'e git, işin bitince shipping'e yönlendir*/
  }

  return (
    <>
      {isLoading && <Loader/>}
      {error && <Message variant="danger">{error?.data?.message || error.error}</Message>}
      <h3 id='rows' className='hosgeldiniz'>"Piyon" eğitim setine hoşgeldiniz.</h3>
      <h3 id='hosgeldiniz' className='hosgeldiniz'>Bu eğitim seti ile hafta başına 1.5 Saat grup dersi, 1 Saat özel ders alma imkanı bulacaksınız.</h3>

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
          <Button className='button-center my-4 btn-lg' variant='success' onClick={() => checkoutHandler(teacher)}>Yüz Yüze/Online Ders Al</Button>
          <h4><em>{teacher && teacher.remainingPeopleForPawn} kişilik yer kaldı <FaExclamationCircle className='warning-icons'/></em></h4>
        </Col>
      </Row>
      ))}
    </>
  )
}

export default Pawn
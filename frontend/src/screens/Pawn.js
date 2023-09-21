import React from 'react'
import {Row, Col, Image, Button} from "react-bootstrap"

import { useEffect, useState } from 'react'
import axios from 'axios';

const Pawn = () => {
  const [teachers, setTeachers] = useState([]);

  /*get the products from backend i.e server.js: app.get("/api/teachers", (req, res) => {res.json(products); })*/
  useEffect(() => {
   const fetchTeachers = async () => {
      const {data} = await axios.get("/api/teachers"); 
      setTeachers(data);
   }
   fetchTeachers();
  }, []) //[] means: only one time

  return (
    <>
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
          <Button className='button-center my-3 btn-lg' variant='success'>Ders Al</Button>
        </Col>
      </Row>
      ))}
    </>
  )
}

export default Pawn
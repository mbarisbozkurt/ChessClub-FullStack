import React from 'react'
import {Row, Col, Container, Image, Card, Button} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight, faChessBishop, faChessRook, faChessQueen } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap'; 
import { useGetTeachersQuery } from '../slices/teachersApiSlice'

const HomeScreen = () => {

  const {data: teachers, isLoading, error} = useGetTeachersQuery();

  return (
    <>
      <section id="başlık">
        <Container fluid>
          <Row>
            <Col lg={6}>
              <h1>Çocuklarınıza satranç öğreterek gelişimlerine katkıda bulunun.</h1>
            </Col>
            <Col lg={6}>
              <img className="chess-image" src="/images/depositphotos_326783930-stock-il-removebg-preview.png" alt="chess" />
            </Col>
          </Row>
        </Container>
      </section>

      <section id="özellikler">
        <Row className="allContainers">
          <Col md={3}>
            <FontAwesomeIcon icon={faChessKnight} className='fa-solid'/>
            <h3>Dikkat ve Konsantrasyon</h3>
            <p>Satranç oynamak, dikkatinizi ve konsantrasyonunuzu geliştirir. Oyun sırasında odaklanmanız gereken birçok farklı faktör vardır, bu da beyin gücünüzü arttırır.</p>
          </Col>
          <Col md={3}>
            <FontAwesomeIcon icon={faChessBishop} className='fa-solid'/>
            <h3>Sabır ve Öz Disiplin</h3>
            <p>Satranç oynamak, sabır ve öz disiplin gerektirir. Oyun sırasında beklemek, düşünmek ve doğru hamleleri yapmak için sabırlı olmalısınız. Bu, diğer alanlarda da öz disiplin gerektiren işlerde yardımcı olabilir.</p>
          </Col>
          <Col md={3}>
            <FontAwesomeIcon icon={faChessRook} className='fa-solid'/>
            <h3>Hafıza Geliştirme</h3>
            <p>Satranç oynarken, oyun sırasında yapılan hamleleri hatırlamanız gerekir. Bu, hafıza geliştirme becerilerinizi de arttırır.</p>
          </Col>
          <Col md={3}>
            <FontAwesomeIcon icon={faChessQueen} className='fa-solid'/>
            <h3>Sosyal Etkileşim</h3>
            <p>Satranç, başka insanlarla etkileşim kurmak için mükemmel bir yoldur. Kulübümüze ve satranç turnuvalarına katılarak başkalarıyla satranç oynamak için fırsatlar yaratabilirsiniz.</p>
          </Col>
        </Row>
      </section>
      
      <section id="eğitmenler">
            <h2 className="staff">EĞİTMENLER</h2>
            <Row className="photo-container">
              {teachers && teachers.map((teacher) => (
                <Col lg={3} className="person">
                  <Image className="iso-photo photos" src={teacher.image} alt="photos" />
                  <h5 className="names">{teacher.name}</h5>
                </Col>
              ))}
            </Row>
        </section>

        <section id="ders-al">
            <h2>Yüz Yüze/Online Ders Alın</h2>
            <p>Siz ve çocuğunuz için basit ve uygun fiyat planları</p>
              <Row>
                  <Col lg={4} md={6} className="pricing-column">
                      <Card>
                          <Card.Header>
                              <h3>Piyon</h3>
                          </Card.Header>
                          <Card.Body>
                              <h2>200TL/AY</h2>
                              <p>Hafta Başına 1.5 Saat Grup Dersi</p>
                              <p>Hafta Başına 1 Saat Özel Ders İmkanı</p>
                          </Card.Body>
                          <Card.Footer>
                              <LinkContainer to={"/piyon"}>
                                <Button variant="outline-dark" size="lg" className="sign-up-buttons">Eğitmen Seç ve Ders Al</Button>
                              </LinkContainer>
                          </Card.Footer>
                      </Card>
                  </Col>

                  <Col lg={4} md={6} className="pricing-column">
                      <Card>
                          <Card.Header>
                              <h3>Fil</h3>
                          </Card.Header>
                          <Card.Body>
                              <h2>400TL/AY</h2>
                              <p>Hafta Başına 4 Saat Grup Dersi</p>
                              <p>Hafta Başına 2 Saat Özel Ders İmkanı</p>
                          </Card.Body>
                          <Card.Footer>
                              <LinkContainer to={"/fil"}>
                                <Button variant="outline-dark" size="lg" className="sign-up-buttons">Eğitmen Seç ve Ders Al</Button>
                              </LinkContainer>
                          </Card.Footer>
                      </Card>
                  </Col>

                  <Col lg={4} md={12} className="pricing-column">
                      <Card>
                          <Card.Header>
                              <h3>Vezir</h3>
                          </Card.Header>
                          <Card.Body>
                              <h2>600TL/AY</h2>
                              <p>Hafta Başına 6 Saat Grup Dersi</p>
                              <p>Hafta Başına 4 Saat Özel Ders İmkanı</p>
                          </Card.Body>
                          <Card.Footer>
                              <LinkContainer to={"/vezir"}>
                                <Button variant="outline-dark" size="lg" className="sign-up-buttons">Eğitmen Seç ve Ders Al</Button>
                              </LinkContainer>
                          </Card.Footer>
                      </Card>
                  </Col>
              </Row>
        </section>
    </>
  )
}

export default HomeScreen
import React from 'react'
import {Row, Col, Image, Button} from "react-bootstrap"

const Queen = () => {
  return (
    <>
      <h3 id='rows' className='hosgeldiniz'>"Vezir" eğitim setine hoşgeldiniz.</h3>
      <h3 id='hosgeldiniz' className='hosgeldiniz'>Bu eğitim seti ile hafta başına 6 Saat grup dersi, 4 Saat özel ders alma imkanı bulacaksınız.</h3>
      <Row id='rows' style={{backgroundColor: "#B4E4FF"}}> 

        {/* <h3>"Piyon" eğitim setine hoşgeldiniz. Bu eğitim seti ile hafta başına 1.5 Saat grup dersi, 1 Saat özel ders alma imkanı bulacaksınız</h3> */}
        <Col md={4} className='my-5'>
          <Row>
            <Image className="iso-photo photos" src="images/iso-e1599314615102.jpg" alt="iso-photo" />
          </Row>
          <Row>
            <h5 className='iso-name mt-3'>NM İsmail Tarık Baltacı</h5>
          </Row>
        </Col>

        <Col md={6} className='my-5 text-center'>
          <h4 className='mt-5'>
            15 yılı aşkın bir süredir satranç oynayan Ismail Tarık Baltacı, 2100+ ukdye ulaşarak NM unvanını almaya hak kazandı. 2014 yılında 15 yaş kategorisinde 4. olarak milli takıma 
            girdi. Yalova Altınkale Satranç Kulübünde birebir ve grup dersleri konusunda 5 yıldan fazla tecrübesi olan eğitmenimizden ders alabilirsiniz. 1600 - 1800 UKD arası iseniz, bu eğitmenden ders almayı düşünebilirsiniz.
          </h4>
          <h4>İletişim: 0542 563 99 19</h4>
          <Button className='button-center my-3 btn-lg' variant='success'>Ders Al</Button>
        </Col>

      </Row>

      <Row id='rows'>
 
        <Col md={3} className='my-5'>
          <Row>
            <Image className="şamil-photo photos" src="images/272920431_4797855093662086_5044797289672000267_n.jpg" alt="şamil-photo" />
          </Row>
          <Row>
            <h5 className='samilName mt-3'>Şamil Aliyev</h5>
          </Row>
        </Col>

        <Col md={7} className='my-5 mx-5 text-center'>
          <h4 className='mt-5'>
            10 yılı aşkın bir süredir satranç oynayan Şamil Aliyev, 1900+ ukdye sahiptir. 2018-2020 arası Yalova Altınkale Satranç Kulübü, 2020-2023 yılları arasında ise İzmir'in çeşitli kulüplerinde eğitmenlik yapan Şamil Aliyev'in birebir ve grup dersleri konusunda 4 yıldan fazla tecrübesi vardır. 
            1300 - 1600 UKD arası iseniz, bu eğitmenden ders almayı düşünebilirsiniz.
          </h4>
          <h4>İletişim: 0542 582 77 35</h4>
          <Button className='button-center my-5 btn-lg' variant='success'>Ders Al</Button>
        </Col>

      </Row>

      <Row id='rows' style={{backgroundColor: "#B4E4FF"}}>
        
        <Col md={4} className='my-5'>
          <Row>
            <Image className="barış-photo photos" src="images/13690929_10210129296817039_6920167410369767353_o.jpg" alt="barış-photo" />
          </Row>
          <Row>
            <h5 className='barisName mt-3'>Mehmet Barış Bozkurt</h5>
          </Row>
        </Col>

        <Col md={6} className='my-5 text-center'>
          <h4 className='mt-5'>
            15 yılı aşkın bir süredir satranç oynayan Mehmet Barış Bozkurt, 1650+ ukdye sahiptir. Çoğu Yalova'da olmak üzere 30'dan fazla madalya ve 7 kupa kazandı. 
            1100 - 1300 UKD arası iseniz, bu eğitmenden ders almayı düşünebilirsiniz.
          </h4>
          <h4>İletişim: 0536 647 71 12</h4>
          <Button className='button-center my-3 btn-lg' variant='success'>Ders Al</Button>
        </Col>

      </Row>

      <Row id='rows'>
        
        <Col md={4} className='my-5'>
          <Row>
            <Image className="deniz-photo photos" src="images/146ac58a-fde4-4d14-9f40-9990fb96027c.jpeg" alt="deniz-photo" />
          </Row>
          <Row>
            <h5 className='denizName mt-3'>Deniz Özgen</h5>
          </Row>
        </Col>

        <Col md={6} className='my-5 text-center'>
          <h4 className='mt-5'>
            5 yılı aşkın bir süredir satranç Deniz Özgen, 1400+ ukdye sahiptir. Çoğu Yalova'da olmak üzere birçok başarıya imza attı. 
            1000 - 1100 UKD arası iseniz, bu eğitmenden ders almayı düşünebilirsiniz.
          </h4>
          <h4>İletişim: 0533 408 35 77</h4>
          <Button className='button-center my-3 btn-lg' variant='success'>Ders Al</Button>
        </Col>

      </Row>
    </>
  )
}

export default Queen
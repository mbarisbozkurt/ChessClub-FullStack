import {Row, Col} from "react-bootstrap"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
   <footer id="footer">
        <Row>
          <Col className="text-center">
            <Link to="https://www.instagram.com/anlayis.satranc/" className="social-media-link">
              <FontAwesomeIcon icon={faInstagram} className="social-media" />
            </Link>
            <Link to="https://twitter.com/denozgen" className="social-media-link">
              <FontAwesomeIcon icon={faTwitter} className="social-media" />
            </Link>
            <Link to="https://www.facebook.com/profile.php?id=649134456" className="social-media-link">
              <FontAwesomeIcon icon={faFacebook} className="social-media" />
            </Link>
          </Col>
        </Row>
        <Row>
            <Col className="text-center py-3">
               <p>© Copyright &copy; {currentYear} Anlayış Satranç Akademi</p>
            </Col>
        </Row>
   </footer>
  )
}

export default Footer
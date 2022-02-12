import React from 'react';
import appstore from '../../../images/Appstore.png';
import playstore from '../../../images/playstore.png';
import './footer.css';

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download app for android and IoS mobile phone</p>
            <img src={playstore} alt="playstore" />
            <img src={appstore} alt="appstore" />
        </div>

        <div className="midFooter">
            <h1>ECOMMERCE.</h1>
            <p>High quality is our best priority</p>

            <p>Copyrights 2022 © Meghna</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="/">Instagram</a>
            <a href="/">Youtube</a>
            <a href="/">Facebook</a>
        </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Icon } from '../UI/icons';
import manchesterIcon from '../../Resources/images/logos/manchester_city_logo.png';

const Footer = props => {
  return (
    <footer className="bck_blue" style={{ padding: '50px 0' }}>
      <div className="footer_logo">
        <Icon link={true} linkTo="/" iconSrc={manchesterIcon} width="70px" height="70px" />
      </div>
      <div className="footer_discl">Manchester City</div>
    </footer>
  );
};

export default Footer;

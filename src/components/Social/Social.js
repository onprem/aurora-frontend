import React from 'react';
import classNames from 'classnames';

import { ReactComponent as FacebookIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as InstagramIcon } from '../../assets/icons/instagram.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as YouTubeIcon } from '../../assets/icons/youtube.svg';

import styles from './Social.module.css';

const Social = ({ className, fill }) => {
  const icons = [
    {
      url: 'https://www.facebook.com/auroraiiitm',
      title: 'FaceBook',
      Icon: FacebookIcon,
    },
    {
      title: 'Instagram',
      url: 'https://instagram.com',
      Icon: InstagramIcon,
    },
    {
      title: 'LinkedIn',
      url: 'https://linkedin.com',
      Icon: LinkedInIcon,
    },
    {
      title: 'YouTube',
      url: 'https://youtube.com',
      Icon: YouTubeIcon,
    },
  ].map(elem => (
    <a href={elem.url} key={elem.title} target="_blank" rel="noopener noreferrer">
      <elem.Icon color={fill} />
    </a>
  ));

  return <div className={classNames(styles.Social, className)}>{icons}</div>;
};

Social.defaultProps = {
  fill: '#ffffff',
};

export default Social;

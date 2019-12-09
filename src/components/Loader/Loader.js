import React from 'react';

import { ReactComponent as PuffIcon } from '../../assets/icons/puff.svg';

const Loader = ({ className, fill, height }) => {
  return (
    <PuffIcon height={height} width={height} className={className} stroke={fill} fill={fill} />
  );
};

Loader.defaultProps = {
  fill: '#ffffff',
  height: '44px',
};

export default Loader;

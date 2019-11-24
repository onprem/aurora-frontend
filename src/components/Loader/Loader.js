import React from 'react';

import { ReactComponent as PuffIcon } from '../../assets/icons/puff.svg';

const Loader = ({ className, fill }) => {
  return <PuffIcon className={className} stroke={fill} fill={fill} />;
};

Loader.defaultProps = {
  fill: '#ffffff',
};

export default Loader;

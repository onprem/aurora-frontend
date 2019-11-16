import React from 'react';

import { ReactComponent as PuffIcon } from '../../assets/icons/puff.svg';

const Loader = ({ className }) => {
  return <PuffIcon className={className} />;
};

export default Loader;

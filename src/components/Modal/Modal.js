/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { ReactComponent as CrossIcon } from '../../assets/icons/cross.svg';

import styles from './Modal.module.css';

const Modal = ({ isOpen, setIsOpen, children }) => {
  const btnRef = useRef(null);

  const handleKey = event => {
    event.stopPropagation();
    if (event.key === 'Escape' && isOpen) setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      btnRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={classNames(styles.container, { [styles.open]: isOpen })}
      onClick={() => setIsOpen(false)}
      role="none"
      onKeyDown={handleKey}
    >
      <button ref={btnRef} className={styles.crossBtn} type="button">
        <CrossIcon />
      </button>
      <div className={styles.modal} onClick={e => e.stopPropagation()} role="none">
        {children}
      </div>
    </div>
  );
};

export default Modal;

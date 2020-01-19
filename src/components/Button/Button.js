import React from 'react';
import classNames from 'classnames';
import Loader from '../Loader/Loader';

import styles from './Button.module.css';

const ButtonContent = ({ text, Icon, iconPosition }) => {
  if (Icon && iconPosition === 'left')
    return (
      <>
        <Icon height="1.2em" className={styles.rightMargin} />
        {text}
      </>
    );
  if (Icon && iconPosition === 'right')
    return (
      <>
        {text}
        <Icon height="1.2em" className={styles.leftMargin} />
      </>
    );
  return <>{text}</>;
};

const Button = ({ className, text, Icon, iconPosition, onClick, isLoading, type }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={classNames(styles.Button, className)}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <ButtonContent text={text} Icon={Icon} iconPosition={iconPosition} />
      )}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  iconPosition: 'right',
  onClick: evt => {
    evt.preventDefault();
  },
};

export default Button;

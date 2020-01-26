import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Booking } from '../../../assets/icons/tag.svg';
import { ReactComponent as Acc } from '../../../assets/icons/booking.svg';

import styles from './proAcc.module.css';

const ProAcc = ({ className, user }) => {
  const history = useHistory();
  return (
    <section className={classNames(styles.profileSection, className)}>
      <div className={styles.leftDiv}>
        <div className={styles.detailsDiv}>
          <div>
            {user.pronite && <span>Pronites:</span>}
            <span>
              {user.pronite ? (
                'Booked'
              ) : (
                <button
                  type="button"
                  className={styles.accomodation_book_button}
                  onClick={() => history.push('/passes')}
                >
                  <>
                    <div className={styles.book_pronite}>BOOK PRONITE</div>
                    <Booking className={styles.booking_button_svg} fill="white" />
                  </>
                </button>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.rightDiv}>
        <div className={styles.detailsDiv}>
          <div>
            {user.accommodation && <span>Accommodation:</span>}
            <span>
              {user.accommodation ? (
                'Booked'
              ) : (
                <button
                  type="button"
                  className={styles.accomodation_book_button}
                  onClick={() => history.push('/accomodation')}
                >
                  <>
                    <div className={styles.book_pronite}>BOOK ACCOMODATION</div>
                    <Acc className={styles.booking_button_svg} fill="white" />
                  </>
                </button>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProAcc;

/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Modal from '../../../Modal/Modal';
import ReVerifyPronite from './Actions/ReVerifyPronite';
import ReVerifyEvent from './Actions/ReVerifyEvent';
import ReVerifyAcc from './Actions/ReVerifyAcc';

import styles from './OrderModal.module.css';

const OrderModal = ({ order, isOpen, setIsOpen, canEditOrders, orderType }) => {
  // orderType = 'evt' || 'acc' || 'pro'
  const time = order
    ? new Date(Number(order.timeSt) * 1000).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
      })
    : null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {order && (
        <>
          <h3 className={styles.modalHeadings}>ORDER DETAILS</h3>
          <section className={styles.modalSections}>
            <span>
              <b>ORDER-ID:</b> {order.orderId}
            </span>
            <span>
              <b>PAYMENT-ID:</b> {order.paymentId}
            </span>
            <span>
              <b>STATUS:</b> {order.status.toUpperCase()}
            </span>
            <span>
              <b>AMOUNT:</b> {order.amount}
            </span>
          </section>
          <section className={styles.modalSections}>
            <span>
              <b>PAID-BY:</b> {order.paidBy.name}
            </span>
            <span>
              <b>AR-ID:</b> {order.paidBy.id}
            </span>
            <span>
              <b>EMAIL:</b> {order.paidBy.email}
            </span>
            <span>
              <b>TIME:</b> {time}
            </span>
          </section>
          {(orderType === 'acc' || orderType === 'pro') && (
            <>
              <h3 className={styles.modalHeadings}>USERS</h3>
              {order.users.map(u => (
                <React.Fragment key={u.id}>
                  <section className={styles.modalSections}>
                    <span>
                      <b>AR-ID:</b> {u.id}
                    </span>
                    <span>
                      <b>NAME:</b> {u.name}
                    </span>
                    <span>
                      <b>EMAIL:</b> {u.email}
                    </span>
                    <span>
                      <b>PHONE:</b> {u.phone}
                    </span>
                  </section>
                  <section className={styles.modalSections}>
                    <span>
                      <b>COLLEGE:</b> {u.college}
                    </span>
                    <span>
                      <b>CITY:</b> {u.city}
                    </span>
                  </section>
                </React.Fragment>
              ))}
            </>
          )}
          {orderType === 'evt' && (
            <>
              <h3 className={styles.modalHeadings}>EVENTS</h3>
              {order.teams.map(t => (
                <section className={styles.modalSections} key={t.id}>
                  <span>
                    <b>TEAM-ID:</b> {t.id}
                  </span>
                  {t.event.isNameRequired && (
                    <span>
                      <b>NAME:</b> {t.name}
                    </span>
                  )}
                  <span>
                    <b>EVENT:</b> {t.event.name}
                  </span>
                  <span>
                    <b>STATUS:</b> {t.paymentStatus ? 'Paid' : 'Unpaid'}
                  </span>
                </section>
              ))}
            </>
          )}
          {canEditOrders && (
            <>
              <h3 className={styles.modalHeadings}>ACTIONS</h3>
              <section className={styles.modalSections}>
                {orderType === 'pro' && (
                  <span>
                    <ReVerifyPronite orderId={order.orderId} />
                  </span>
                )}
                {orderType === 'acc' && (
                  <span>
                    <ReVerifyAcc orderId={order.orderId} />
                  </span>
                )}
                {orderType === 'evt' && (
                  <span>
                    <ReVerifyEvent orderId={order.orderId} />
                  </span>
                )}
              </section>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default OrderModal;

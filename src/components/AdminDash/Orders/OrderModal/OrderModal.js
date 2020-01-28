/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Modal from '../../../Modal/Modal';
import ReVerifyPronite from './Actions/ReVerifyPronite';

import styles from './OrderModal.module.css';

const OrderModal = ({ order, isOpen, setIsOpen, canEditPronites }) => {
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
          </section>
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
          {canEditPronites && (
            <>
              <h3 className={styles.modalHeadings}>ACTIONS</h3>
              <section className={styles.modalSections}>
                <span>
                  <ReVerifyPronite orderId={order.orderId} />
                </span>
              </section>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default OrderModal;

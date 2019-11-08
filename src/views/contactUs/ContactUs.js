import React from 'react';

import style from './contactUs.module.css';

const cordiData = [
  {
    name: `Ojaswa Sharma`,
    tel: 999999999999,
    mail: `dummy@dummy.com`,
  },
  {
    name: `Chandan Kumar`,
    tel: 999999999999,
    mail: `dummy@dummy.com`,
  },
  {
    name: `Arihant Jain`,
    tel: 999999999999,
    mail: `dummy@dummy.com`,
  },
  {
    name: `Ruchika Agarwal`,
    tel: 999999999999,
    mail: `dummy@dummy.com`,
  },
];

const Contact = () => {
  return (
    <div className={style.contact_parent_container}>
      <div className={style.contact_container}>
        <div className={style.contact_left}>
          <div className={style.contact_us}>
            <h3 className={style.contact_heading}>Contact Us :</h3>
            <div className={style.contact_card}>
              {cordiData.map(data => (
                <div className={style.cordi}>
                  <h4 className={style.cordi_heading}>{data.name}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className={style.find_us}>
            <h3 className={style.contact_heading}>Find Us :</h3>
            <div className={style.map_container} />
          </div>
        </div>
        <div className={style.contact_divider} />
        <div className={style.contact_right}>
          <h3 className={style.contact_heading}>Reach Us :</h3>
        </div>
      </div>
    </div>
  );
};
export default Contact;

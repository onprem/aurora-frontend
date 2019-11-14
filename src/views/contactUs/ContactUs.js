import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import style from './contactUs.module.css';

import Particle from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import Alert from '../../components/Alert/Alert';

import logo from '../../assets/icons/auroraLogo.svg';
import { ReactComponent as Mail } from '../../assets/icons/mail-new.svg';
import { ReactComponent as Phone } from '../../assets/icons/phone.svg';
import useMediaQuery from '../../utils/useMediaQuery';

import CONTACT_US from '../../graphQl/mutations/contactUs';

const cordiData = [
  {
    name: `Ojaswa Sharma`,
    tel: `+91-9131102279`,
    mail: `ojaswa@aurorafest.org`,
  },
  {
    name: `Chandan Kumar`,
    tel: `+91-7004727387`,
    mail: `chandan@aurorafest.org`,
  },
  {
    name: `Arihant Jain`,
    tel: `+91-7509998118`,
    mail: `arihant@aurorafest.org`,
  },
  {
    name: `Ruchika Agrawal`,
    tel: `+91-7470358637`,
    mail: `ruchika@aurorafest.org`,
  },
];

const Contact = () => {
  const [inputs, changeInputs] = useState({ name: '', email: '', subject: '', message: '' });
  const [runContactUs, { data, loading, error }] = useMutation(CONTACT_US);
  const isMobile = useMediaQuery('(max-width:850px)');

  const handleInput = event => {
    const { value, name } = event.target;
    changeInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    runContactUs({ variables: inputs });
    changeInputs({ name: '', email: '', subject: '', message: '' });
  };
  return (
    <>
      {data && <Alert message={data.contactUs.message} type="success" />}
      {error && <Alert message="some error occured" type="error" />}

      <Link to="/">
        <img src={logo} className={style.contact_aurora_logo} alt="logo" />
      </Link>
      <div className={style.contact_parent_container}>
        <div className={style.contact_container}>
          <div className={style.contact_left}>
            <div className={style.contact_us}>
              <h3 className={style.contact_heading}>Contact Us :</h3>
              <div className={style.contact_card}>
                {cordiData.map(cData => (
                  <div className={style.cordi}>
                    <h4 className={style.cordi_heading}>{cData.name}</h4>
                    <a href={`tel:${cData.tel}`}>
                      <Phone width="30px" height="30px" />
                    </a>

                    <a href={`mailto:${cData.mail}`}>
                      <Mail width="30px" height="30px" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.find_us}>
              <h3 className={style.contact_heading}>Find Us :</h3>
              <div className={style.map_container}>
                <div className={style.map_outer}>
                  <div className={style.gmap_canvas}>
                    <iframe
                      width="100%"
                      height="100%"
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=IIIIM%20Gwalior&t=&z=17&ie=UTF8&iwloc=&output=embed"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      title="g_map"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.contact_divider} />
          <div className={style.contact_right}>
            <form className={style.form}>
              <h3 className={style.contact_heading}>Reach Us :</h3>
              <input
                type="text"
                className={style.single_line_input}
                placeholder="Name"
                name="name"
                value={inputs.name}
                onChange={handleInput}
              />
              <input
                type="email"
                className={style.single_line_input}
                placeholder="E-mail Address"
                name="email"
                value={inputs.email}
                onChange={handleInput}
              />
              <input
                type="text"
                className={style.single_line_input}
                placeholder="Subject"
                name="subject"
                value={inputs.subject}
                onChange={handleInput}
              />
              <textarea
                className={style.multiple_line_input}
                placeholder="Message"
                name="message"
                value={inputs.message}
                onChange={handleInput}
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className={style.form_submit}
                disabled={loading}
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
        {isMobile ? null : <Social fill="#000000" />}
      </div>

      <Particle />
    </>
  );
};
export default Contact;

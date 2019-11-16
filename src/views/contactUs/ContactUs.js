import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import style from './contactUs.module.css';

import Particle from '../../components/particles/Particle';
import Social from '../../components/Social/Social';
import Path from '../../components/chealCaowaPath/Path';
import Bat from '../../components/bat/Bat';
import AnimateChealCaowa from '../../utils/chealCaowa';
import Loader from '../../components/Loader/Loader';

import logo from '../../assets/icons/auroraLogo.svg';
import { ReactComponent as Mail } from '../../assets/icons/mail-new.svg';
import { ReactComponent as Phone } from '../../assets/icons/phone.svg';
import useMediaQuery from '../../utils/useMediaQuery';
import emailValidation from '../../utils/validation';
import getAlert from '../../utils/getAlert';

import CONTACT_US from '../../graphQl/mutations/contactUs';

const cordiData = [
  {
    name: `Arihant Jain`,
    tel: `+91-7509998118`,
    mail: `arihant@aurorafest.org`,
  },
  {
    name: `Chandan Kumar`,
    tel: `+91-7004727387`,
    mail: `chandan@aurorafest.org`,
  },
  {
    name: `Ojaswa Sharma`,
    tel: `+91-9131102279`,
    mail: `ojaswa@aurorafest.org`,
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
    const toast = getAlert();
    if (inputs.email && inputs.name && inputs.message) {
      if (emailValidation(inputs.email)) {
        runContactUs({ variables: inputs });
      } else {
        toast.fire({
          icon: 'error',
          title: 'Please enter valid email',
        });
      }
    } else {
      changeInputs({
        name: inputs.name ? inputs.name : undefined,
        email: inputs.email ? inputs.email : undefined,
        subject: inputs.subject ? inputs.subject : undefined,
        message: inputs.message ? inputs.message : undefined,
      });
      toast.fire({
        icon: 'error',
        title: 'Name, email or message cannot be empty',
      });
    }
  };
  useEffect(() => {
    const bat1 = document.getElementById('bat1');
    const bat2 = document.getElementById('bat2');
    const bat3 = document.getElementById('bat3');
    const path1 = document.getElementsByClassName('path_wrapper')[0].getElementsByTagName('path')[
      Math.floor(Math.random() * 17)
    ];
    const path2 = document.getElementsByClassName('path_wrapper')[0].getElementsByTagName('path')[
      Math.floor(Math.random() * 17)
    ];
    const path3 = document.getElementsByClassName('path_wrapper')[0].getElementsByTagName('path')[
      Math.floor(Math.random() * 17)
    ];

    const chealCaowa1 = new AnimateChealCaowa(path1, bat1, 200, 0, 0.0003);
    const AnimateChealCaowaFrame1 = requestAnimationFrame(chealCaowa1.moveBat);
    const chealCaowa2 = new AnimateChealCaowa(path2, bat2, 200, 0, 0.0003);
    const AnimateChealCaowaFrame2 = requestAnimationFrame(chealCaowa2.moveBat);
    const chealCaowa3 = new AnimateChealCaowa(path3, bat3, 200, 0, 0.0003);
    const AnimateChealCaowaFrame3 = requestAnimationFrame(chealCaowa3.moveBat);
    return () => {
      window.cancelAnimationFrame(AnimateChealCaowaFrame1);
      window.cancelAnimationFrame(AnimateChealCaowaFrame2);
      window.cancelAnimationFrame(AnimateChealCaowaFrame3);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const toast = getAlert();
      toast.fire({
        icon: 'success',
        title: data.contactUs.message,
      });
      changeInputs({ name: '', email: '', subject: '', message: '' });
    }
  }, [data]);

  useEffect(() => {
    if (error && error.graphQLErrors.length > 0) {
      const toast = getAlert();
      toast.fire({
        icon: 'error',
        title: error.graphQLErrors[0].message,
      });
    }
  }, [error]);

  return (
    <>
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
                className={
                  inputs.name === undefined
                    ? `${style.single_line_input} ${style.inValid}`
                    : `${style.single_line_input}`
                }
                placeholder="Name"
                name="name"
                value={inputs.name}
                onChange={handleInput}
                required
              />
              <input
                type="email"
                className={
                  // eslint-disable-next-line no-nested-ternary
                  inputs.email
                    ? emailValidation(inputs.email)
                      ? `${style.single_line_input}`
                      : `${style.single_line_input} ${style.inValid}`
                    : inputs.email === undefined
                    ? `${style.single_line_input} ${style.inValid}`
                    : `${style.single_line_input}`
                }
                placeholder="E-mail Address"
                name="email"
                value={inputs.email}
                onChange={handleInput}
                required
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
                className={
                  inputs.message === undefined
                    ? `${style.multiple_line_input} ${style.inValid}`
                    : `${style.multiple_line_input}`
                }
                placeholder="Message"
                name="message"
                value={inputs.message}
                onChange={handleInput}
                required
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className={style.form_submit}
                disabled={loading}
              >
                {loading ? <Loader /> : `SUBMIT`}
              </button>
            </form>
          </div>
        </div>
        {isMobile ? null : <Social fill="#000000" />}
      </div>

      <Particle />
      <Path width="100px" height="100px" />
      <div className="bat_div">
        <Bat className={style.contact_ChealCaowa} id="bat1" key="1" />
        <Bat className={style.contact_ChealCaowa} id="bat2" key="2" />
        <Bat className={style.contact_ChealCaowa} id="bat3" key="3" />
      </div>
    </>
  );
};
export default Contact;

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import axios from 'axios';
import Navbar from '../navbar';

const RegisterPage: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleRegister = async () => {
    const firstName = firstNameRef.current?.value || '';
    const lastName = lastNameRef.current?.value || '';
    const phoneNumber = phoneNumberRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    const registrationData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/register', registrationData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.log('Registration error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="registration-page">
        <h2 className="register-title">{t('global.register')}</h2>
        <div className="input-container">
          <label htmlFor="firstName" className="register-label">{t('global.firstname')}</label>
          <input type="text" id="firstName" ref={firstNameRef} className="register-input" />
        </div>
        <div className="input-container">
          <label htmlFor="lastName" className="register-label">{t('global.lastname')}</label>
          <input type="text" id="lastName" ref={lastNameRef} className="register-input" />
        </div>
        <div className="input-container">
          <label htmlFor="phoneNumber" className="register-label">{t('global.phonenum')}</label>
          <input type="text" id="phoneNumber" ref={phoneNumberRef} className="register-input" />
        </div>
        <div className="input-container">
          <label htmlFor="email" className="register-label">{t('global.E-mail')}</label>
          <input type="email" id="email" ref={emailRef} className="register-input" />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="register-label">{t('global.password')}</label>
          <input type="password" id="password" ref={passwordRef} className="register-input" />
        </div>
        <button onClick={handleRegister} className="register-page-button">{t('global.register')}</button>
        <p className="login-link">
        {t('global.alreadyhaveacc')} <Link to="/" className="login-link">{t('global.login')}</Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
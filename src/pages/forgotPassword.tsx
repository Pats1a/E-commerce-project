import React from 'react';
import Navbar from '../navbar';
import '../App.css'
import { useTranslation } from 'react-i18next';

const ForgotPasswordPage: React.FC = () => {
    const { t } = useTranslation();

  return (
    <>
    <Navbar />
    <div className="forgot-password-page">
        <div className='forg-pass-container'>
        <h2>{t('global.forgotpassword')}</h2>
        <div className="fpp-input-container">
            <label htmlFor="email">{t('global.E-mail')}:</label>
            <input className='forg-pass-inp' type="email" id="email"/>
        </div>
        <button className="send-email-button">{t('global.sendemail')}</button>
        </div>
    </div>
  </>
  );
};

export default ForgotPasswordPage;
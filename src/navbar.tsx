import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import zoomerlogo from './images/zoommerlogo.png';
import profileIcon from './images/profile-icon.png';
import ShoppingCart from './images/shopping-cart.png';
import searchIcon from './images/search-icon.png';
import GoogleIcon from './images/google-icon.png'
import { useTranslation } from 'react-i18next'
import './App.css';

interface Contains {
  contains: (target: Node) => boolean;
}

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      'contains' in dropdownRef.current &&
      !(dropdownRef.current as Contains).contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="zoommer-navigation">
      <ul className="nav-list">
        <li>
          <Link to="/">
            <img src={zoomerlogo} alt="zoomer logo" className="zoomer-logo" />
          </Link>
          <form className="searching-system" action="">
            <input className="search-bar" type="text" placeholder={t("global.search")} />
            <button className="search-button">
              <img src={searchIcon} alt="Search" />
            </button>
          </form>
          <div>
            <div className="dropdown" ref={dropdownRef}>
              <a className="user-profile" onClick={toggleDropdown}>
                <img src={profileIcon} alt="User" className="profile-icon" />
                {t("global.profile")}
              </a>
              {showDropdown && (
                <div className="dropdown-content">
                  <h4>{t("global.authorization")}</h4>
                  <div className="user-input">
                    <input type="email" placeholder={t("global.E-mail")} />
                    <input type="password" placeholder={t("global.password")} />
                  </div>
                  <a className="forgot-password" href="/forgotpassword">
                  {t("global.forgotpassword")}
                  </a>
                  <div className="login-register-buttons">
                    <button className="logIn-button">{t("global.login")}</button>
                    <button className="register-button" onClick={handleRegister}>
                    {t("global.register")}
                    </button>
                  </div>
                  <h5 className="txt-between-lines">{t("global.or")}</h5>
                  <button className='register-with-google'><img className='register-google-icon' src={GoogleIcon}/></button>
                </div>
              )}
            </div>
          </div>
          <Link className="cart-link" to="/Cart">
            <img className="cart-image" src={ShoppingCart} alt="Cart" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
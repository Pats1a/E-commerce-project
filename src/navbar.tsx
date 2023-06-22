import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import zoomerlogo from './images/zoommerlogo.png';
import profileIcon from './images/profile-icon.png';
import ShoppingCart from './images/shopping-cart.png';
import searchIcon from './images/search-icon.png';
import GoogleIcon from './images/google-icon.png';
import { useTranslation } from 'react-i18next';
import './App.css';

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

interface Contains {
  contains: (target: Node) => boolean;
}

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
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

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: email,
        password: password,
      });

      const token = response.data.token;

      localStorage.setItem('token', token);

      const userInfoResponse = await axios.get('http://localhost:8080/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userInfo: UserInfo = userInfoResponse.data;

      setLoggedIn(true);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserInfo(null);
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUserInfo = async () => {
        try {
          const userInfoResponse = await axios.get('http://localhost:8080/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userInfo: UserInfo = userInfoResponse.data;

          setLoggedIn(true);
          setUserInfo(userInfo);
        } catch (error) {
          console.log('Error fetching user info:', error);
        }
      };

      fetchUserInfo();
    }
  }, []);

  return (
    <nav className="zoommer-navigation">
      <ul className="nav-list">
        <li>
          <Link to="/">
            <img src={zoomerlogo} alt="zoomer logo" className="zoomer-logo" />
          </Link>
          <form className="searching-system" action="">
            <input className="search-bar" type="text" placeholder={t('global.search')} />
            <button className="search-button">
              <img src={searchIcon} alt="Search" />
            </button>
          </form>
          <div>
            <div className="dropdown" ref={dropdownRef}>
              {loggedIn ? (
                <a className="user-profile" onClick={toggleDropdown}>
                  <img src={profileIcon} alt="User" className="profile-icon" />
                  {t('global.profile')}
                </a>
              ) : (
                <a className="user-profile" onClick={toggleDropdown}>
                  <img src={profileIcon} alt="User" className="profile-icon" />
                  {t('global.profile')}
                </a>
              )}
              {showDropdown && (
                <div className="dropdown-content">
                  {loggedIn ? (
                    <>
                      <h4>{t('global.authorization')}</h4>
                      <div className="user-info">
                        <p>{userInfo?.name}</p>
                        <p>{userInfo?.email}</p>
                      </div>
                      <button className="logout-button" onClick={logout}>
                        {t('global.logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <h4>{t('global.authorization')}</h4>
                      <div className="user-input">
                        <input type="email" placeholder={t('global.E-mail')} ref={emailRef} />
                        <input type="password" placeholder={t('global.password')} ref={passwordRef} />
                      </div>
                      <a className="forgot-password" href="/forgotpassword">
                        {t('global.forgotpassword')}
                      </a>
                      <div className="login-register-buttons">
                        <button className="logIn-button" onClick={handleLogin}>
                          {t('global.login')}
                        </button>
                        <button className="register-button" onClick={handleRegister}>
                          {t('global.register')}
                        </button>
                      </div>
                      <h5 className="txt-between-lines">{t('global.or')}</h5>
                      <button className="register-with-google">
                        <img className="register-google-icon" src={GoogleIcon} alt="Google Icon" />
                      </button>
                    </>
                  )}
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
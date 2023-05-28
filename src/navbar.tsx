import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import zoomerlogo from './images/zoommerlogo.png'
import profileIcon from './images/profile-icon.png'
import shoppingCart from './images/shopping-cart.png'
import searchIcon from './images/search-icon.png'
import './App.css'

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && 'contains' in dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);   
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="zoommer-navigation">
      <ul className='nav-list'>
        <li>
          <a href="/home"><img src={zoomerlogo} alt="zoomer logo" className='zoomer-logo' /></a>
          <form className='searching-system' action="">
            <input className='search-bar' type="text" placeholder='ძიება...' />
            <button className='search-button'><img src={searchIcon} alt="Search" /></button>
          </form>
          <div>
            <div className='dropdown' ref={dropdownRef}>
              <a className='user-profile' onClick={toggleDropdown}>
                <img src={profileIcon} alt="User" className='profile-icon' />
                პროფილი
              </a>
              {showDropdown && (
                <div className='dropdown-content'>
                  <h4>ავტორიზაცია</h4>
                  <div className='user-input'>
                  <input type="email" placeholder='ელ. ფოსტა' />
                  <input type="password" placeholder='პაროლი' />
                  </div>
                  <a className='forgot-password' href="">დაგავიწყდათ პაროლი?</a>
                  <div className='login-register-buttons'>
                    <button className='logIn-button'>შესვლა</button>
                    <button className='register-button'>რეგისტრაცია</button>
                  </div>
                  <h5 className='txt-between-lines'>ან</h5>
                </div>
              )}
            </div>
          </div>
          <NavLink className='cart-link' to="/cart"><img className='cart-image' src={shoppingCart} alt="Cart" />0 ₾</NavLink>
        </li>
      </ul>
    </nav>
  );
}
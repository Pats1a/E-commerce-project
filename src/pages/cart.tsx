import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation} from 'react-i18next'
import Navbar from "../navbar";
import whiteBurgerMenu from "../images/white-burger-menu.png";
import EmptyCart from "../images/empty-cart.png"

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
}

interface LimitedParagraphProps {
  text: string;
  limit: number;
}

export function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { t } = useTranslation();
  const LimitedParagraph: React.FC<LimitedParagraphProps> = ({ text, limit }) => {
    const words = text.split(' ');
    const limitedText = words.slice(0, limit).join(' ');

    return <p className='cart-item-title'>{limitedText} ...</p>;
  };

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const removeFromCart = (itemId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.toString());
      return isNaN(itemPrice) ? total : total + Math.round(itemPrice);
    }, 0);
    return Math.round(totalPrice * 100) / 100;
  };

  return (
    <>
      <Navbar />
      <div className="cart-navigation">
        <div className="cart-navigation-field">
          <div className="cart-navigation-left">
            <img className="white-burger-menu" src={whiteBurgerMenu} alt="Burger Menu" />
            <h1>{t('global.cartheadernav')}</h1>
          </div>
          <div className='cart-location'>
            <h1>{t('global.cartheaderlocation')}</h1>
          </div>
        </div>
      </div>
      <div className="cart-info">
        <div className="cart-added-products">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>{t('global.cartisempty')}</p>
              <Link to="/">{t('global.addproduct')}<img src={EmptyCart}/></Link>
            </div>
          ) : (
            <ul className='cart-item-ul'>
              {cartItems.map(item => (
                <li className='cart-item-li' key={item.id}>
                  <img className='cart-item-img' src={item.image} alt="Product" />
                  <LimitedParagraph text={item.title} limit={7} />
                  <p className='cart-item-price'>{Math.round(item.price)}<span>₾</span></p>
                  <button className='cart-item-remove' onClick={() => removeFromCart(item.id)}>{t('global.remove')}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="cart-paying">
          <h2 className="cart-paying-total"><span>{t('global.sum')}</span>{getTotalPrice()} <span>₾</span></h2>
          <button className='cart-paying-button'>{t('global.checkout')}</button>
        </div>
      </div>
      <footer className='footer'>
        <Link to='/contact' className='contact-link'>{t('global.contact')}</Link>
      </footer>
    </>
  )
}

export default ShoppingCart;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../navbar"
import whiteBurgerMenu from "../images/white-burger-menu.png";

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
export function ShoppingCart(){
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
    return (
    <>
        <Navbar/>
        <div className="cart-navigation">
            <div className="cart-navigation-field">
                <div className="cart-navigation-left">
                    <img className="white-burger-menu" src={whiteBurgerMenu} />
                    <h1>ნავიგაცია</h1>
                </div>
                <div>
                    <h1>მთავარი 🡢 კალათა</h1>
                </div>
            </div>
        </div>
        <div className="cart-info">
        <div className="cart-added-products">
            <ul className='cart-item-ul'>
                {cartItems.map(item => (
                <li className='cart-item-li' key={item.id}>
                    <img className='cart-item-img' src={item.image} alt="Product" />
                        <LimitedParagraph text={item.title} limit={7} />
                        <p className='cart-item-price'>{Math.round(item.price)}<span>₾</span></p>
                    <button className='cart-item-remove' onClick={() => removeFromCart(item.id)}>წაშლა</button>
                </li>
                ))}
            </ul>
        </div>
            <div className="cart-paying">

            </div>
        </div>
        <footer className='footer'>
            <Link to='/contact' className='contact-link'>Contact</Link>
        </footer>
    </>
    )
}
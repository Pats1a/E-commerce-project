import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  description: string;
  brand: string;
  category: string;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:8080/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const item = { id: product?.id, title: product?.title, image: product?.images[0], price: product?.price };
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };


  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="product-window">
        <div className="product-window-frame">
          <div className="product-window-image">
            <img className="window-image" src={product.images[0]} alt="Product" />
          </div>
          <div className="window-info">
            <div className="window-info-text">
              <h2>{product.title}</h2>
              <div className="window-info-payment">
                <div className="window-payment">
                  <p className="window-price">{Math.round(product.price)} <span>₾</span></p>
                  <button className="window-btn" onClick={handleAddToCart}>კალათაში დამატება</button>
                </div>
                <div className="short-desc">
                  <p className="short-desc-text">ბრენდი: {product.brand}</p>
                  <p className="short-desc-text">კატეგორია: {product.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="desc-header">აღწერილობა:</h2>
        <div className="long-desc">
          <p className="long-desc-text">
            {showFullDescription ? product.description : `${product.description.slice(0, 100)}...`}
          </p>
          <button className='desc-btn' onClick={toggleDescription}>
            {showFullDescription ? 'დაპატარავება' : 'მეტის ნახვა...'}
          </button>
        </div>
      </div>
        <footer className='footer'>
            <Link to='/contact' className='contact-link'>Contact</Link>
        </footer>
    </>
  );
}
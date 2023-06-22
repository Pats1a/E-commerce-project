import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import cartIcon from '../images/shopping-cart.png'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'

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
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { t } = useTranslation();

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
    setAddedToCart(true);
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
            <img className="window-image" src={product.images[selectedImageIndex]} alt="Product" />
            <div className='window-tiny-images'>
              <img className="tiny-image" src={product.images[0]} onClick={() => setSelectedImageIndex(0)} />
              <img className="tiny-image" src={product.images[1]} onClick={() => setSelectedImageIndex(1)} />
              <img className="tiny-image" src={product.images[2]} onClick={() => setSelectedImageIndex(2)} />
            </div>
          </div>
          <div className="window-info">
            <div className="window-info-text">
              <h2>{product.title}</h2>
              <div className="window-info-payment">
                <div className="window-payment">
                  <p className="window-price">{Math.round(product.price)} <span>₾</span></p>
                  <div className='window-btn-flex'>
                    <button className="window-btn" onClick={handleAddToCart}><span>{t('global.addtocart')}</span><img className='cart-responsive-icon' src={cartIcon}/></button>
                    {addedToCart && <p className='added-to-cart'>{t('global.addedtocart')}</p>}
                  </div>
                </div>
                <div className="short-desc">
                  <p className="short-desc-text">{t('global.brand')}{product.brand}</p>
                  <p className="short-desc-text">{t('global.category')}{product.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="desc-header">{t('global.descheader')}</h2>
        <div className="long-desc">
          <p className="long-desc-text">
            {showFullDescription ? product.description : `${product.description.slice(0, 100)}...`}
          </p>
          <button className='desc-btn' onClick={toggleDescription}>
            {showFullDescription ? t('global.descshowless') : t('global.descshowmore')}
          </button>
        </div>
      </div>
      <footer className='footer'>
        <Link to='/contact' className='contact-link'>{t("global.contact")}</Link>
      </footer>
    </>
  );
}
import React, { useEffect, useState } from 'react';
import productsIcon from "./images/products-icon.png";
import ProductsApi from './services/API';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  brand: string;
}

interface LimitedParagraphProps {
  text: string;
  limit: number;
}

const LimitedParagraph: React.FC<LimitedParagraphProps> = ({ text, limit }) => {
  const words = text.split(' ');
  const limitedText = words.slice(0, limit).join(' ');
  return <p className='product-title'>{limitedText} ...</p>;
};

const Products: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(45);
  const pageNumber = 1;
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
  const [showMoreCount, setShowMoreCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const brandOptions = [
    'All Products',
    'Samsung',
    'LG',
    'Sony',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const response = await ProductsApi(pageNumber, currentPage);
      setItems(response.data.products);

      setIsLoading(false);
    };

    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedBrand !== 'All Products') {
        setCurrentPage(45);
      }

      setIsLoading(true);

      const response = await ProductsApi(pageNumber, currentPage);
      setItems(response.data.products);

      setIsLoading(false);
    };

    fetchProducts();
  }, [currentPage, selectedBrand]);

  useEffect(() => {
    setShowMoreCount(1);
  }, [selectedBrand]);

  const showMoreProducts = () => {
    if (isLoading) {
      return;
    }

    let increment: number;
    if (selectedBrand && ['Samsung', 'LG', 'Sony'].includes(selectedBrand)) {
      increment = 1000;
    } else {
      increment = 180;
    }

    const newCurrentPage = currentPage + (increment * showMoreCount);

    setIsLoading(true);

    ProductsApi(pageNumber, newCurrentPage)
      .then((response) => {
        const newItems: Product[] = response.data.products;
        setItems((prevItems: Product[]) => [...prevItems, ...newItems]);
        setCurrentPage(newCurrentPage);
        setShowMoreCount((prevCount: number) => prevCount + 1);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const filteredItems = selectedBrand && selectedBrand !== 'All Products'
    ? items.filter((product) => product.brand === selectedBrand)
    : items;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    setShowBackToTop(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='product-page'>
      <div className='product-field'>
        <div className='product-field-header'>
          <div className='products-icon'>
            <img src={productsIcon} alt="icon" />
            <h1>პროდუქტები</h1>
          </div>
          <div className='brand-filter'>
            <select className='brand-filter-select'
              value={selectedBrand || ''}
              onChange={(e) => {
                setSelectedBrand(e.target.value || undefined);
                setCurrentPage(45);
              }}
            >
              {brandOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="all-product">
          {filteredItems.map((product) => (
            <div className='every-product' key={product.id}>
              <div className='product-link'>
                <Link to={`/products/${product.id}`} className='product-link'>
                  <img className='product-image' src={product.images[0]} alt='' />
                  <LimitedParagraph text={product.title} limit={7} />
                  <p className='product-price'>{Math.round(product.price)} ₾</p>
                  <button className='product-button'>პროდუქტზე გადასვლა</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className='show-more'>
          <button onClick={showMoreProducts} className='show-more-button' disabled={isLoading}>
            {isLoading ? 'იტვირთება...' : 'მეტის ნახვა'} <span>🡳</span>
          </button>
        </div>
      </div>
      {showBackToTop && (
        <div className='back-to-top'>
          <button onClick={handleBackToTop} className='back-to-top-button'>🡹</button>
        </div>
      )}
      <footer className='footer'>
        <Link to='/contact' className='contact-link'>Contact</Link>
      </footer>
    </div>
  );
};

export default Products;
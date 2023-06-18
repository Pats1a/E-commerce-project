import React, { useEffect, useState } from 'react';
import productsIcon from "./images/products-icon.png";
import ProductsApi from './services/API';
import { Link } from 'react-router-dom';

interface Products {
  id: number;
  title: string;
  images: string[];
  price: number;
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

function Products() {
  const [item, setData] = useState<Products[]>([]);
  const [currentpage, setCurrentPage] = useState(45);
  const pagenumb = 7;

  useEffect(() => {
    ProductsApi(pagenumb, currentpage)
      .then((response) => setData(response.data.products));
  }, [currentpage]);

  const showMoreProducts = () => {
    const newCurrentPage = currentpage + 10;
    ProductsApi(pagenumb, newCurrentPage)
      .then((response) => setData(response.data.products));
    setCurrentPage(newCurrentPage);
  };

  return (
    <div className='product-field'>
      <div className='product-field-header'>
        <div className='products-icon'>
          <img src={productsIcon} alt="icon" />
        </div>
        <h1>პროდუქტები</h1>
      </div>
      <div className="all-product">
      {item.map((product) => (
        <div className='every-product' key={product.id}>
          <Link to={`/products/${product.id}`} className='product-link'>
            <img className='product-image' src={product.images[0]} alt='' />
            <LimitedParagraph text={product.title} limit={7} />
            <p className='product-price'>{Math.round(product.price)} ₾</p>
            <button onClick={(e) => {e.preventDefault()}} className='product-button'>კალათაში დამატება</button>
          </Link>
        </div>
      ))}
      </div>
      <div className='show-more'>
        <button onClick={showMoreProducts} className='show-more-button'>მეტის ნახვა <span>🡳</span></button>
      </div>
    </div>
  );
}

export default Products;
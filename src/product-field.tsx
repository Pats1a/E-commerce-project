import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import productsIcon from "./images/products-icon.png";
import ProductsApi from './services/API';

interface Products {
  id: number;
  title: string;
  images: string[];
  price: number;
}

function Products() { 
  const [item, setData] = useState<Products[]>([]);
  const [currentpage, setCurrentPage] = useState(45);
  const pagenumb = 15;

  useEffect(() => {
    ProductsApi(pagenumb, currentpage)
      .then((response) => setData(response.data.products));
  }, [currentpage]);

  const showMoreProducts = () => {
    const newCurrentPage = currentpage + 5;
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
            <img className='product-image' src={product.images[0]} alt="" />
            <p className='product-title'>{product.title}</p>
            <p className='product-price'>{Math.round(product.price)} ₾</p>
            <button className='product-button'>კალათაში დამატება</button>
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

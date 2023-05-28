import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import productsIcon from "./images/products-icon.png";
import ProductsApi from './services/API';

interface Products {
  id: number;
  title: string;
  images: string[];
  price: string;
}

function Products() { 
  const [item, setData] = useState<Products[]>([]);
  const pageragac = 15;
  const currentpage = 21;

  useEffect(() => {
    ProductsApi(pageragac, currentpage)
      .then((response) => setData(response.data.products));
  }, []);

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
            <img src={product.images[0]} alt="" />
            <p>{product.title}</p>
            <p>{product.price} $</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
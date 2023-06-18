import axios from 'axios';

interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
}

const getProduct = async (productId: number): Promise<Product> => {
  const response = await axios.get(`http://localhost:8080/product/${productId}`);
  return response.data;
};

export default getProduct;
import { Routes, Route } from 'react-router-dom';
import { ShoppingCart } from './pages/cart';
import MainPage from './pages/full';
import ProductPage from './pages/product';
import ContactPage from './pages/contact';
import RegisterPage from './pages/register';
import ForgotPasswordPage from './pages/forgotPassword';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Cart" element={<ShoppingCart />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path='/forgotpassword' element={<ForgotPasswordPage/>}></Route>
    </Routes>
  );
}

export default App;
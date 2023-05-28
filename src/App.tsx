import { useState } from 'react'
import Navbar from "./navbar"
import { Routes, Route } from 'react-router-dom'
import { shoppingCart } from './pages/cart'
import Carousel from "./carousel"
import Products from "./product-field"
import './App.css'

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/cart' element={shoppingCart()}/>
    </Routes>
      <Navbar/>
      <Carousel/>
      <Products/>
    </>
  )
}


export default App;
import { useState } from 'react'
import Navbar from "./navbar"
import { Routes, Route } from 'react-router-dom'
import { ShoppingCart } from './pages/cart'
import Carousel from "./carousel"
import Products from "./product-field"
import  MainPage from "./pages/full"
import './App.css'

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element = {<MainPage/>}></Route>
      <Route path='/cart' element={<ShoppingCart/>}></Route>
    </Routes>
    </>
  )
}


export default App;
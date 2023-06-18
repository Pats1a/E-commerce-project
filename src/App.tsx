import { useState } from 'react'
import Navbar from "./navbar"
import { Routes, Route } from 'react-router-dom'
import { ShoppingCart } from './pages/cart'
import  MainPage from "./pages/full"
import ProductPage from './pages/product'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element = {<MainPage/>}></Route>
      <Route path='/cart' element={<ShoppingCart/>}></Route>
      <Route path='/products/:id' element={<ProductPage/>}></Route>
    </Routes>
  )
}


export default App;
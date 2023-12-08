import React from 'react'
import { Home, Product, Products } from './pages'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from './pages/login/Login'
import { SignUp } from './pages/signup/SignUp'


export const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/products" element={<Products />}/>
    <Route path="/products/:id" element={<Product />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="sign-up" element={<SignUp />}/>
    </Routes>
    </BrowserRouter>
   
  )
}

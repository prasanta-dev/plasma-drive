import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Services from '../pages/Services/Services'
import Our_work from '../pages/Our_work/Our_work'
import Contact from '../pages/Contact/Contact'
import Login from '../authPages/Login'
import Register from '../authPages/Register'
import ProtectRoutes from './ProtectRoutes'
import AddToCart from '../pages/AddToCart/AddToCart'
import Orders from '../pages/Orders/Orders'
import Admin from '../pages/Dashboard/Admin'


function AppRoute() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/our-works' element={<Our_work />} />
        <Route path='/contact-us' element={<Contact />} />
        {/* Protect Routes pages */}
        <Route element={<ProtectRoutes />}>
          <Route path='/addToCart' element={<AddToCart />} />
          <Route path='/orders' element={<Orders />} />
        </Route>
      </Route>
      {/* Auth Routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/admin' element={<Admin />} />
    </Routes>
  )
}

export default AppRoute
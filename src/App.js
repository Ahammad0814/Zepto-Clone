import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HomeApp from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import Cart from './components/Cart';
import ServiceAvailability from './components/ServiceAvailability';
import Orders from './components/orders';
import Search from './components/searchPage';

const App = () => {
  return (
    <Router>
      <div>
        <Helmet>
          <title>Sculpt Zepto Craft</title>
        </Helmet>
        <Routes>
          <Route path="/" exact element={<HomeApp />} />
          <Route path="/products" exact element={<ProductsPage/>}/>
          <Route path="/cart" exact element={<Cart/>} />
          <Route path='/notavailable' exact element={<ServiceAvailability />} />
          <Route path='/orders' exact element={<Orders />} />
          <Route path='/search' exact element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

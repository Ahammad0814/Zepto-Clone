import React, { useEffect } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { TotalDataAPI } from './Data';
import Cookies from 'js-cookie';

const Header = () => {
  let history = useNavigate();

  let Cart_Data_Array = [];
  for (let id = 0; id < TotalDataAPI.length; id++){
      const cartData = JSON.parse(localStorage.getItem(`CartData_${id}`));
      if (cartData && Array.isArray(cartData)) {
          Cart_Data_Array = [...Cart_Data_Array, ...cartData];
      }
  }
  const forYouCartData = JSON.parse(localStorage.getItem('ForYou_CartData'));
  if (forYouCartData && Array.isArray(forYouCartData)){
      Cart_Data_Array.push(...forYouCartData);
  }
  const homeProductCartData = JSON.parse(localStorage.getItem('HomeProduct_CartData'));
  if (homeProductCartData && Array.isArray(homeProductCartData)){
    Cart_Data_Array.push(...homeProductCartData);
  }
  const searchedCartData = JSON.parse(localStorage.getItem('Searched_CartData'));
  if (searchedCartData && Array.isArray(searchedCartData)){
    Cart_Data_Array.push(...searchedCartData);
  }

  const Cart_length = Cart_Data_Array !== null ? Cart_Data_Array.length : 0;
  let Cart_Items = 0;
  let Cart_Cost = 0;
  Cart_Data_Array !== null &&
  Cart_Data_Array.map((product)=>{
    Cart_Items += product.Quantity;
    Cart_Cost += product.Price * product.Quantity;
  })

  const handleKeyDown = (event) =>{
    if (event.key === 'Enter'){
      Cookies.set('SearchData',document.querySelector('.header-search').value);
      window.location.href = '/search';
    }
  }
  const NavigateCartPage = () => {
    history('/cart');
  };
  const NavigateHomePage = () => {
    history('/');
    if (localStorage.getItem('City') === 'NotAvailable'){
    }
  }
  const CheckAvailability = () => {
    let Element = document.querySelector('.city-opt');
    localStorage.setItem('City', Element.value);
    if (localStorage.getItem('City') === 'NotAvailable') {
      history('/notavailable');
    }else{
      history('/');
    }
  };
  useEffect(() => {
    if (performance.navigation.type === 1) {
      if (localStorage.getItem('City') === 'NotAvailable') {
        history('/notavailable');
      }
    }
  }, []);
  let StorageElement = localStorage.getItem('City');

  return (
    <div className='header-div'>
      <div className='header-div1'>
          <img onClick={NavigateHomePage} className='header-logo' src="images1/Zepto-logo.png" alt="Zepto Logo" />
        <select className='city-opt' onChange={CheckAvailability} defaultValue={StorageElement}>
          <option value={'Hyderbad'}>Hyderbad</option>
          <option value={'Banglore'}>Banglore</option>
          <option value={'Chennai'}>Chennai</option>
          <option value={'Delhi'}>Delhi</option>
          <option value={'Kolkata'}>Kolkata</option>
          <option value={'Mumbai'}>Mumbai</option>
          <option value={'Pune'}>Pune</option>
          <option value={'NotAvailable'}>Others</option>
        </select>
      </div>
      <div className='header-div2'>
        <button className='search-logo-btn'><img className='search-logo' src="images1/Search-logo.png"></img></button>
        <input className='header-search' placeholder='Search for products' onKeyDown={handleKeyDown}></input>
      </div>
      <div className='header-div3'>
        <button onClick={NavigateCartPage} className='header-cart-button'>
            <img className='cart-logo' src="images1/Cart-logo.png"></img>
            <span className='cart-line' style={{visibility : Cart_length > 0 ? 'visible' : 'hidden'}} >|</span>
            <p className='cart-name' style={{visibility : Cart_length > 0 ? 'hidden' : 'visible'}}>Cart</p>
            <span className='cart-btn-items' style={{visibility : Cart_length > 0 ? 'visible' : 'hidden'}}>
              {Cart_Items} items<br/>₹{Cart_Cost}
            </span>
        </button>
      </div>
    </div>
  );
}

export default Header;

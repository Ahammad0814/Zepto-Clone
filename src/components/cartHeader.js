import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import './header.css'

const CartHeader = () => {
  let history = useNavigate();
    const NavigateHomePage = () => {
        history('/');
      }
      
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem('CartData')) || [];
      
      let storedCart_length = storedCart.length || 0;

      const cartSubheaderInnerDiv = document.querySelector('.cart-subheader-inner-div');
      if (storedCart_length > 0) {
        cartSubheaderInnerDiv.style.visibility = 'visible';
      } else {
        cartSubheaderInnerDiv.style.visibility = 'hidden';
      }
    }, []);
    const NavigateToOrderPage = () =>{
      history('/orders');
    }

    const NavigateSearchPage = () => {
      history('/search')
    }

    const CheckAvailability = () => {
      let Element = document.querySelector('.city-opt');
      localStorage.setItem('City', Element.value);
      if (localStorage.getItem('City') === 'NotAvailable') {
        history('/notavailable');
      }
    };
    useEffect(()=>{
      CheckAvailability();
    }, [localStorage.getItem('City')]);

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
        <input className='header-search' placeholder='Search for products' onClick={NavigateSearchPage}></input>
      </div>
      <div className='header-div3'>
        <button onClick={NavigateToOrderPage} className='Cart-header-button'>
            <p className='Cart-name'>Orders</p>
        </button>
      </div>
      <div className='cart-subheader-inner-div'>
        <img className='cart-delivery-img-left' src="images1/Delivery-min-left.png"></img>
        <button className='cart-delivery-time'>Delivering to you in <span>10</span> min</button>
        <img className='cart-delivery-img-right' src="images1/Delivery-min-right.png"></img>
      </div>
    </div>
  )
}

export default CartHeader;
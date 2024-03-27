import React, { useState, useEffect } from 'react';
import './orders.css';
import Header from './header';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  let history = useNavigate();
  let ordersData = JSON.parse(localStorage.getItem('OrdersData')) || [];

  const [NamesArray, setNamesArray] = useState([]);
  let Total_Price = JSON.parse(localStorage.getItem('Total_Order_Price'));
  let GetDateTime = JSON.parse(localStorage.getItem('Date'));

  useEffect(() => {
    const names = ordersData.map((product, index) => {
      return index === ordersData.length - 1 ? `${product.Name}` : `${product.Name}, `;
    });
    setNamesArray(names);
  }, [ordersData]);

  let OrderBtnVisible = Cookies.get('BtnValue');
  let value = Cookies.get('value') || 'hidden';

  const OrderDetails = () => {
    let BtnElement = document.querySelector('.order-btn-img');
    let BtnElement0 = document.querySelector('.orders-detail-button');
    if (value === 'hidden') {
      Cookies.set('BtnValue', 'true');
      Cookies.set('value', 'visible');
      BtnElement.setAttribute('src', 'images1/arrow-up.png');
      BtnElement0.style.borderBottomLeftRadius = '0';
      BtnElement0.style.borderBottomRightRadius = '0';
    } else {
      Cookies.set('BtnValue', 'false');
      Cookies.set('value', 'hidden');
      BtnElement.setAttribute('src', 'images1/arrow-down.png');
      BtnElement0.style.borderBottomLeftRadius = '10px';
      BtnElement0.style.borderBottomRightRadius = '10px';
    }
  };
  const NavigateHomePage = () => {
    history('/')
  }

  if (localStorage.getItem('Status') === 'Arriving'){
    setTimeout(()=>{
          localStorage.setItem('Status','Delivered');
    }, 10000);
  }

  let Status = localStorage.getItem('Status');

  if(ordersData.length > 0){
  return (
    <div className='Orders-Div'>
      <Header />
      <h2>Orders</h2>
      <div className='order-main-div'>
          <div className='orders-outer-div'>
            <div className='orders-inner-div'>
            <div className='order-info-div'>
              <p className='orders-name'>{NamesArray}</p>
              <p className='orders-id'>#357SAZTPHM{Total_Price * 357}</p>
              <p className='orders-date'>{GetDateTime}</p>
            </div>
            <div className='orders-price-div'>
              <span className='orders-cost'>₹{Total_Price}</span>
              <span className='orders-status' style={{backgroundColor : Status === 'Delivered' ? 'rgba(82,183,93,255)' : 'rgba(100,116,139,255)'}}>{localStorage.getItem('Status')}</span>
            </div>
            </div>
            <div className='Orders-detail-button-div'>
              <button onClick={OrderDetails} className='orders-detail-button'>
                <img className='order-btn-img' src='images1/arrow-down.png'></img>
              </button>
            </div>
          {ordersData.map((Data, index)=>{
            return(
          <div key={index} className='order-products-inner-div' style={{ visibility: OrderBtnVisible === 'true' ? 'visible' : 'hidden' }}>
            <div className='order-product-div' style={{ visibility: OrderBtnVisible === 'true' ? 'visible' : 'hidden' }}>
              <img className='order-product-img' src={Data.ImageSrc}/>
              <div>
                <p className='cart-product-name'>{Data.Name}</p>
                <p className='cart-product-info'>{Data.Info}</p>
                <span className={`cart-product-price cart-product-price-${index}`}>₹{Data.Price * Data.Quantity}</span> 
                <span className={`cart-product-actual-price cart-product-actual-price-${index}`}>₹{Data.Actual_Price * Data.Quantity}</span>
                <button className='order-produts-qty-btn'>Qty: {Data.Quantity}</button>
              </div>
            </div>
          </div>
          );
        })}
        </div>
      </div>
    </div>
  )}else{
    return(
      <div className='Orders-Empty-div'>
      <Header />
      <img className='Orders-Empty-img' src='images1/emptyorders.png' />
      <button onClick={NavigateHomePage} className='Orders-Empty-btn'>Browser Products</button> 
    </div>
    )
  }
};

export default Orders;
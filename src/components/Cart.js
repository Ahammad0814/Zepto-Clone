import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartHeader from './cartHeader';
import { TotalDataAPI } from './Data';
import './Cart.css';

const Cart = () => {
  let history = useNavigate();
  let ForYouProducts = JSON.parse(localStorage.getItem('ForYou_CartData'));
  let HomeProducts = JSON.parse(localStorage.getItem('HomeProduct_CartData'));
  let SearchProducts = JSON.parse(localStorage.getItem('Searched_CartData'));
  let Cart_Data_Array = [];
  
  for (let id = 0; id < TotalDataAPI.length; id++){
      const cartData = JSON.parse(localStorage.getItem(`CartData_${id}`));
      if (cartData && Array.isArray(cartData)) {
          Cart_Data_Array = [...Cart_Data_Array, ...cartData];
      }
  }
  if (ForYouProducts && Array.isArray(ForYouProducts)){
      Cart_Data_Array.push(...ForYouProducts);
  }
  if (HomeProducts && Array.isArray(HomeProducts)){
      Cart_Data_Array.push(...HomeProducts);
  }
  if (SearchProducts && Array.isArray(SearchProducts)){
      Cart_Data_Array.push(...SearchProducts);
  }
  const [cartDataArray, setCartDataArray] = useState([...Cart_Data_Array]);
  const [selectedTip, setSelectedTip] = useState(null);

  useEffect(() => {
    localStorage.setItem('Cart_Data', JSON.stringify(cartDataArray));
  }, [cartDataArray]);


  let CartLength = cartDataArray.length || 0;
  localStorage.setItem('CartLength', JSON.stringify(CartLength));

  const AddTip = (amount) => {
    if (selectedTip === amount) {
      setSelectedTip(null);
    } else {
      setSelectedTip(amount);
    }
  };

  const updateProductQuantity = (id, newQuantity) => {
    const updatedCart = cartDataArray.map((product, index) =>
      index === id ? { ...product, Quantity: newQuantity } : product
    );
    setCartDataArray(updatedCart);
  };
  
  const removeProduct = (id) => {
    let Products = [];
    const updatedCart = cartDataArray.filter((_, index) => index !== id);
    setCartDataArray(updatedCart);
    if (ForYouProducts.some(obj => obj.Name === cartDataArray[id].Name)) {
      let index = ForYouProducts.findIndex(obj => obj.Name === cartDataArray[id].Name);
      ForYouProducts.splice(index, 1);

    } else if (HomeProducts.some(obj => obj.Name === cartDataArray[id].Name)) {
      let index = HomeProducts.findIndex(obj => obj.Name === cartDataArray[id].Name);
      HomeProducts.splice(index, 1);

    } else if (SearchProducts.some(obj => obj.Name === cartDataArray[id].Name)) {
      let index = SearchProducts.findIndex(obj => obj.Name === cartDataArray[id].Name);
      SearchProducts.splice(index, 1);
    }else{
      for (let No = 0; No < TotalDataAPI.length; No++){
        Products = JSON.parse(localStorage.getItem(`CartData_${No}`));
        let index = Products.findIndex(obj => obj.Name === cartDataArray[id].Name);
        if (index !== -1) {
          Products.splice(index , 1);
          localStorage.setItem(`CartData_${No}`, JSON.stringify(Products));
        }
        }
    }
    localStorage.setItem('ForYou_CartData',JSON.stringify(ForYouProducts));
    localStorage.setItem('HomeProduct_CartData',JSON.stringify(HomeProducts));
    localStorage.setItem('Searched_CartData',JSON.stringify(SearchProducts));
  };

  const ProductsQty = (element, id) => {
    let Products = [];
    if (element === '-') {
      if (cartDataArray[id].Quantity > 1) {
        updateProductQuantity(id, cartDataArray[id].Quantity - 1);
        if (ForYouProducts.some(obj => obj.Name === cartDataArray[id].Name)) {
          let index = ForYouProducts.findIndex(obj => obj.Name === cartDataArray[id].Name);
          ForYouProducts[index].Quantity -= 1;
  
        } else if (HomeProducts.some(obj => obj.Name === cartDataArray[id].Name)) {
          let index = HomeProducts.findIndex(obj => obj.Name === cartDataArray[id].Name);
          HomeProducts[index].Quantity -= 1;
  
        } else if (SearchProducts.some(obj => obj.Name === cartDataArray[id].Name)) {
          let index = SearchProducts.findIndex(obj => obj.Name === cartDataArray[id].Name);
          SearchProducts[index].Quantity -= 1;

        }else{
          for (let No = 0; No < TotalDataAPI.length; No++){
            Products = JSON.parse(localStorage.getItem(`CartData_${No}`));
            if (Products) {
              let index = Products.findIndex(obj => obj.Name === cartDataArray[id].Name);
              if (index !== -1) {
                Products[index].Quantity -= 1;
                localStorage.setItem(`CartData_${No}`,JSON.stringify(Products));
              }
            }
          }
        }
        localStorage.setItem('ForYou_CartData',JSON.stringify(ForYouProducts));
        localStorage.setItem('HomeProduct_CartData',JSON.stringify(HomeProducts));
        localStorage.setItem('Searched_CartData',JSON.stringify(SearchProducts));
      } else {
        removeProduct(id);
        history('');
      }
    } else if (element === '+') {
      if (cartDataArray[id].Quantity < 10){
      updateProductQuantity(id, cartDataArray[id].Quantity + 1);

      if (ForYouProducts.some(obj => obj.Name === cartDataArray[id].Name)) {
        let index = ForYouProducts.findIndex(obj => obj.Name === cartDataArray[id].Name);
        ForYouProducts[index].Quantity += 1;
  
      } else if (HomeProducts.some(obj => obj.Name === cartDataArray[id].Name)) {
        let index = HomeProducts.findIndex(obj => obj.Name === cartDataArray[id].Name);
        HomeProducts[index].Quantity += 1;

      } else if (SearchProducts.some(obj => obj.Name === cartDataArray[id].Name)) {
        let index = SearchProducts.findIndex(obj => obj.Name === cartDataArray[id].Name);
        SearchProducts[index].Quantity += 1;

      }else{
        for (let No = 0; No < TotalDataAPI.length; No++){
          let Products = JSON.parse(localStorage.getItem(`CartData_${No}`));
          if (Products) {
            let index = Products.findIndex(obj => obj.Name === cartDataArray[id].Name);
            if (index !== -1) {
              Products[index].Quantity += 1;
              localStorage.setItem(`CartData_${No}`,JSON.stringify(Products));
            }
          }
        }
      }
      localStorage.setItem('ForYou_CartData',JSON.stringify(ForYouProducts));
      localStorage.setItem('HomeProduct_CartData',JSON.stringify(HomeProducts));
      localStorage.setItem('Searched_CartData',JSON.stringify(SearchProducts));
    }if (cartDataArray[id].Quantity === 10) {
      document.querySelector('.Shoutout-btn').style.visibility = 'visible';
      setTimeout(() => {
        document.querySelector('.Shoutout-btn').style.visibility = 'hidden';
      }, 3000);
    }
    }
  };

  const PlaceOrders = () =>{
    const cartData = JSON.parse(localStorage.getItem('Cart_Data')) || [];
    let Orders_Data = [];
    Orders_Data = [...Orders_Data, ...cartData];
    localStorage.setItem('OrdersData', JSON.stringify(Orders_Data));
    Cart_Data_Array = [];

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    localStorage.setItem('Date', JSON.stringify(formattedDate));
    localStorage.setItem('Status', 'Arriving');
    EmptyData();
    history('/orders');
  };

  const EmptyData = () => {
    let Items = ['Cart_Data', 'ForYou_CartData', 'HomeProduct_CartData','Searched_CartData','UpdatedSearchedDataArray'];
    Items.forEach((item)=>{
      localStorage.setItem(`${item}`, JSON.stringify([]));
    })
    for (let id = 0; id < TotalDataAPI.length; id++){
      localStorage.setItem(`CartData_${id}`, JSON.stringify([]));
    }

    for (let id = 0; id < TotalDataAPI.length; id++) {
      let DataArray = JSON.parse(localStorage.getItem(`UpdatedDataArray${id}`));
      if (DataArray && Array.isArray(DataArray) && DataArray.length > 0) {
        const updatedDataArray = DataArray.map((product) => ({
          ...product,
          Quantity: 0
        }));
        localStorage.setItem(`UpdatedDataArray${id}`, JSON.stringify(updatedDataArray));
      }};

    let ForYouDataArray = JSON.parse(localStorage.getItem('UpdatedForYouDataArray'));
    if (ForYouDataArray && Array.isArray(ForYouDataArray) && ForYouDataArray.length > 0) {
      const updatedForYouDataArray = ForYouDataArray.map((product) => ({
        ...product,
        Quantity: 0
      }));
      localStorage.setItem('UpdatedForYouDataArray', JSON.stringify(updatedForYouDataArray));
    }

    let HomeProductDataArray = JSON.parse(localStorage.getItem('UpdatedHomeDataArray'));
    if (HomeProductDataArray && Array.isArray(HomeProductDataArray) && HomeProductDataArray.length > 0){
      const ModifiedHomeProductsData = HomeProductDataArray.map((product)=> ({
        ...product,
        Quantity : 0
      }));
      localStorage.setItem('UpdatedHomeDataArray', JSON.stringify(ModifiedHomeProductsData));
    }
  }

  let Actual_Total_Price = 0;
  let Total_Price = 0;
  let DeliveryFee = 0;
  let TotalPay = 0;
  let HandlingCost = 7;
  let Discount = 0;
  let Orders_Data_Length = 0;
  const ordersData = localStorage.getItem('OrdersData');
  if (ordersData) {
      Orders_Data_Length = JSON.parse(ordersData).length;
  }
  if (Array.isArray(cartDataArray)) {
    cartDataArray.forEach((product) => {
      Total_Price += product.Price * product.Quantity;
      Actual_Total_Price += product.Actual_Price * product.Quantity;
    });
  }
  if (Total_Price < 100) {
    DeliveryFee = 25;
  } else {
    DeliveryFee = 0;
  }
  let Tip = selectedTip;
  if (Orders_Data_Length === 0 && Total_Price >= 199) {
    Discount = 75;
  }else{
    Discount = 0;
  }
  let Calculated_Price = Total_Price + HandlingCost + DeliveryFee + Tip;
  TotalPay =  Calculated_Price - Discount;
  localStorage.setItem('Total_Order_Price', JSON.stringify(TotalPay));

  const NavigateHomePage = () => {
    history('/');
  }

  let Cart_length = cartDataArray.length || 0;

  if (Cart_length < 1){
    EmptyData();
  }

  if (cartDataArray && Cart_length > 0) {
    localStorage.setItem('CartValue', '0');

  return (
  <div className='Cart'>
      <CartHeader />
      <div className='Cart-Main-Div'>
      <div>
      <div className='Cart-inner-div' style={{overflowY : Cart_length > 3 ? 'scroll' : 'none', height : Cart_length > 3 ? '480px' : 'auto'}}>
        {cartDataArray.map((product, index) => (
          <div key={index} className='Cart-products-inner-div'>
            <div className='cart-product-div' >
              <img className='cart-product-img' src={product.ImageSrc} alt={`Product ${index}`} />
              <div>
                <p className='cart-product-name'>{product.Name}</p>
                <p className='cart-product-info'>{product.Info}</p>
                <span className={`cart-product-price cart-product-price-${index}`}>₹{product.Price * product.Quantity}</span> 
                <span className={`cart-product-actual-price cart-product-actual-price-${index}`}>₹{product.Actual_Price * product.Quantity}</span>
              </div>
              <div className='cart-produts-buttons'>
                <button className='cart-produts-decrease' onClick={()=>ProductsQty('-',index)}>⎯</button>
                <button className={`cart-produts-qty cart-produts-qty-${index}`}>{product.Quantity}</button>
                <button className='cart-produts-increase' onClick={()=>ProductsQty('+',index)}>+</button>
              </div>
            </div>
            {index < Cart_length - 1 && <div className='Cart-horizontal-line'></div>}
          </div>
        ))}
      </div>

      <div className='cart-bottom-div'>
            <p>Delivery Partner Tip</p>
            <div className='tip-btn-div'>
              <button onClick={() => AddTip(10)} className={selectedTip === 10 ? 'tip-btn1 selected' : 'tip-btn1'}
                style={selectedTip === 10 ? { backgroundColor: 'rgba(219,208,228,255)', border: 'solid 2px #3C0069' } : {}}>
                <img src='images1/coin1.png' alt='10' />₹10
              </button>
              <button onClick={() => AddTip(20)} className={selectedTip === 20 ? 'tip-btn2 selected' : 'tip-btn2'}
                style={selectedTip === 20 ? { backgroundColor: 'rgba(219,208,228,255)', border: 'solid 2px #3C0069' } : {}}>
                <img src='images1/coin2.png' alt='20' />₹20
              </button>
              <button onClick={() => AddTip(35)} className={selectedTip === 35 ? 'tip-btn3 selected' : 'tip-btn3'}
                style={selectedTip === 35 ? { backgroundColor: 'rgba(219,208,228,255)', border: 'solid 2px #3C0069' } : {}}>
                <img src='images1/coin3.png' alt='35' />₹35
              </button>
              <button onClick={() => AddTip(50)} className={selectedTip === 50 ? 'tip-btn4 selected' : 'tip-btn4'}
                style={selectedTip === 50 ? { backgroundColor: 'rgba(219,208,228,255)', border: 'solid 2px #3C0069' } : {}}>
                <img src='images1/coin5.png' alt='50' />₹50
              </button>
            </div>
      </div>
      </div>

      <div className='Payment-main-div'>
        <div className='payment-div'>
          <span className='discount-alert' style={{visibility : Total_Price <= 199 && Orders_Data_Length < 1 ? 'visible' : 'hidden', height : Total_Price <= 199 && Orders_Data_Length < 1 ? 'auto' : '0'}}>
            <img src="https://th.bing.com/th/id/OIP.ZkTABpSp0bs-qFvY_uZx5AHaHa?rs=1&pid=ImgDetMain" className='discount-alert-img'/>
          Add <span className='discount--price'>₹{199 - Total_Price}</span> of items to get 75₹ off</span>
          <div>
            <span className='item-total'>Item Total</span>
            <div>
              <span className='actual-total-cost'>₹{Actual_Total_Price}</span>
              <span className='item-total-cost'>₹{Total_Price}</span>
            </div>
          </div>
          <div>
          <span className='handling-fee'>Handling Fee</span>
            <div>
              <span className='actual-handling-cost'>₹15</span>
              <span className='handling-cost'>₹7</span>
            </div>
          </div>
          <div>
            <span className='delivery-fee'>Delivery Fee</span><span className='delivery-cost'>₹{DeliveryFee}</span>
          </div>
          <div style={{visibility : Orders_Data_Length < 1 && Total_Price >= 199 ? 'visible' : 'hidden', height : Orders_Data_Length < 1 ? 'auto' : '0'}}>
            <span className='cart-discount' style={{height : Orders_Data_Length < 1 && Total_Price >= 199 ? 'auto' : '0'}}>
              Cart Discount</span>
            <span className='cart-discount-price' style={{height : Orders_Data_Length < 1 && Total_Price >= 199 ? 'auto' : '0'}}>
              -₹{Discount}</span>
          </div>
          <div>
            <span className='total-to-pay'>To Pay</span><span className='total-pay-cost'>₹{TotalPay}</span>
          </div>
          <div className='Cart-horizontal-line'></div>
        </div>
        <div className='place-order-btn-div'>
          <button className='place-order-button' onClick={PlaceOrders}>Place Order</button>
        </div>
      </div>
      </div>
      <button className='Shoutout-btn'>
        <img src='images1/shout.png' alt='Shoutout' />
        Only 10 unit(s) of this can be added per order
      </button>
  </div>
  )}else{
  return (
    <div>
    <CartHeader />
    <div className='Cart-Empty-Div'>
       <img src='images1/cart-empty.png'></img>
       <p>Your cart is empty!</p>
       <button onClick={NavigateHomePage}>Browser Products</button> 
    </div>
    </div>
  )}
}

export default Cart;
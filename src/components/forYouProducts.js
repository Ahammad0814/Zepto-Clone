import React, { useState, useEffect } from 'react';
import './products.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForYouProducts = () => {
  const history = useNavigate();
  const [ForYouData, setForYouData] = useState([])

  useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    try {
        let api = await axios({
            url: "http://127.0.0.1:8000/foryou/",
            method: "GET",
        });
        let apiResponse = api;
        if (apiResponse.data.length > 0) {
            setForYouData(apiResponse.data);
        } else {
            setForYouData([]);
        }
    } catch (error) {
        console.log(error);
    }
};

  let Data_Array = ForYouData;

  const storedForYouData = localStorage.getItem('UpdatedForYouDataArray');
  const ForYouDataArray = storedForYouData ? JSON.parse(storedForYouData) : Data_Array;

  const [CartProducts, setCartProducts] = useState(() => {
    const storedCartData = JSON.parse(localStorage.getItem('ForYou_CartData')) || [];
    return storedCartData;
  });

  useEffect(() => {
    localStorage.setItem('ForYou_CartData', JSON.stringify(CartProducts));
  }, [CartProducts]);

  const AddProductToCart = (id, quantity) => {
    const cartData = JSON.parse(localStorage.getItem('ForYou_CartData')) || [];
    const existingProductIndex = cartData.findIndex((product) => product.id === id);
  
    if (existingProductIndex !== -1) {
      const updatedCart = [...cartData];
      if (quantity === 0) {
        updatedCart.splice(existingProductIndex, 1);
      } else {
        updatedCart[existingProductIndex].Quantity = quantity;
      }
      localStorage.setItem('ForYou_CartData', JSON.stringify(updatedCart));
    } else if (quantity > 0) {
      const newProduct = {
        id,
        Discount: Data_Array[id].Discount,
        ImageSrc: Data_Array[id].ImageSrc,
        Name: Data_Array[id].Name,
        Info: Data_Array[id].Info,
        Actual_Price: Data_Array[id].Actual_Price,
        Price: Data_Array[id].Price,
        Quantity: quantity,
      };
      localStorage.setItem('ForYou_CartData', JSON.stringify([...cartData, newProduct]));
    }
  }; 

  const AddProduct = (id) => {
    let UpdatedDataArray = ForYouDataArray;
    let DataValue = UpdatedDataArray[id].Quantity += 1;
    localStorage.setItem('UpdatedForYouDataArray', JSON.stringify(UpdatedDataArray))
    AddProductToCart(id, DataValue);
    history('');
  };

  const ProductsQty = (element, id, quantity) => {
    let UpdatedDataArray = JSON.parse(localStorage.getItem('UpdatedForYouDataArray'));
      let TotalQty = quantity;
      console.log(TotalQty,':=<>::=')
      if (TotalQty < 11) {
        if (element === '-') {
          UpdatedDataArray[id].Quantity -= 1;
          localStorage.setItem('UpdatedForYouDataArray', JSON.stringify(UpdatedDataArray))
        }
      }
      if (TotalQty < 10) {
        if (element === '+') {
          UpdatedDataArray[id].Quantity += 1;
          localStorage.setItem('UpdatedForYouDataArray', JSON.stringify(UpdatedDataArray))
        }
      }
      if (TotalQty === 10) {
        document.querySelector('.Shoutout-btn').style.visibility = 'visible';
        setTimeout(() => {
          document.querySelector('.Shoutout-btn').style.visibility = 'hidden';
        }, 3000);
      }
      history('');
      AddProductToCart(id, UpdatedDataArray[id].Quantity);
  };

  return (
    <center>
      <div>
        <div className='for-you-product-title-div'>
          <span className='foryou-product-title'>Products for you</span>
        </div>
        <div className='for-you-product-div'>
          {ForYouDataArray.length>0 && ForYouDataArray.map((product, index) => (
            <div key={index} className='for-you-products-inner-div'>
              <span className="for-you-discount">{product.Discount}% Off</span>
              <div className='for-you-product-img-div'>
                <img className="for-you-product-img" src={product.ImageSrc} alt={`Product ${index}`} />
              </div>
              <div className="for-you-product-info-div">
                <p className="for-you-product-name">{product.Name}</p>
                <p className="for-you-product-info">{product.Info}</p>
              </div>
              
              <div className={'price-div'}>
                <span className="crossed-price">₹{product.Actual_Price}</span>
                <span className="actual-price">₹{product.Price}</span>
                <button className={`products-add-btn products-add-btn-${index}`} onClick={()=>AddProduct(index)}
                style={{visibility : product.Quantity > 0 ? 'hidden' : 'visible'}}>Add</button>
              

                <div className={`products-add-buttons-div products-add-buttons-div-${index}`} style={{visibility : product.Quantity > 0 ? 'visible' : 'hidden'}}>
                  <button className={`product-decrease-btn product-decrease-btn-${index}`} onClick={()=>ProductsQty('-', index, product.Quantity)}>⎯</button>
                  <button className={`product-value-btn product-value-btn-${index}`}>{product.Quantity}</button>
                  <button className={`product-increase-btn product-increase-btn-${index}`} onClick={()=>ProductsQty('+', index, product.Quantity)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className='Shoutout-btn'><img src="images1/shout.png"></img>Only 10 unit(s) of this can be added per order</button>
      </div>
    </center>
  );
};

export default ForYouProducts;

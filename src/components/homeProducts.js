import React, { useState, useEffect } from 'react';
import './ProductsPage.css';
import { useNavigate } from 'react-router-dom';
import { TotalDataAPI } from './Data';
import axios from 'axios';

const HomeProducts = () => {
  const history = useNavigate();
  let HomeDataArray = [];
  let [TotalDataArrays, setTotalDataArrays] = useState([]);
  useEffect(() => {
    fetchAllData();
  }, []);  

    const fetchAllData = async () => {
      try {
        let allData = [];
        for (let id = 0; id < TotalDataAPI.length; id++) {
          let api = await axios({
            url: TotalDataAPI[id],
            method: "GET",
          });
          allData.push(api.data);
        }
        setTotalDataArrays(allData);
      } catch (error) {
        console.log(error);
      }
    };

  TotalDataArrays.map((product)=>{
    HomeDataArray = [...HomeDataArray, ...product.slice(15,18)];
  })

  let DataArray = JSON.parse(localStorage.getItem('UpdatedHomeDataArray')) || HomeDataArray;

  const [CartProducts, setCartProducts] = useState(() => {
    const storedCartData = JSON.parse(localStorage.getItem('HomeProduct_CartData')) || [];
    return storedCartData;
  });

  useEffect(() => {
    localStorage.setItem('HomeProduct_CartData', JSON.stringify(CartProducts));
  }, [CartProducts]);

  const AddProductToCart = (id, quantity) => {
    const cartData = JSON.parse(localStorage.getItem('HomeProduct_CartData')) || [];
    const existingProductIndex = cartData.findIndex((product) => product.id === id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartData];
      if (quantity === 0) {
        updatedCart.splice(existingProductIndex, 1);
      } else {
        updatedCart[existingProductIndex].Quantity = quantity;
      }
      localStorage.setItem('HomeProduct_CartData', JSON.stringify(updatedCart));
    } else if (quantity > 0) {
      const newProduct = {
        id,
        Discount: DataArray[id].Discount,
        ImageSrc: DataArray[id].ImageSrc,
        Name: DataArray[id].Name,
        Info: DataArray[id].Info,
        Actual_Price: DataArray[id].Actual_Price,
        Price: DataArray[id].Price,
        Quantity: quantity,
      };
      localStorage.setItem('HomeProduct_CartData', JSON.stringify([...cartData, newProduct]));
    }
  };

  const AddProduct = (id) => {
    let UpdatedDataArray = DataArray;
    let DataValue = UpdatedDataArray[id].Quantity += 1;
    localStorage.setItem('UpdatedHomeDataArray', JSON.stringify(UpdatedDataArray))
    AddProductToCart(id, DataValue);
    history('');
  };
  
  const ProductsQty = (element, id, quantity) => {
    let UpdatedDataArray = JSON.parse(localStorage.getItem('UpdatedHomeDataArray'));
      let TotalQty = quantity;
      console.log(TotalQty,':=<')
      if (TotalQty < 11) {
        if (element === '-') {
          UpdatedDataArray[id].Quantity -= 1;
          localStorage.setItem('UpdatedHomeDataArray', JSON.stringify(UpdatedDataArray))
        }
      }
      if (TotalQty < 10) {
        if (element === '+') {
          UpdatedDataArray[id].Quantity += 1;
          localStorage.setItem('UpdatedHomeDataArray', JSON.stringify(UpdatedDataArray))
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
    <div className='ProductsPage-Main-Div'>
      <div className='product-div'>
        {DataArray.map((product, innerIndex) => (
          <div key={innerIndex} className='products-inner-div'>
            <span className={`discount discount-${innerIndex}`} style={{ visibility: product.Discount > 0 ? 'visible' : 'hidden' }}>{product.Discount}% Off</span>
            <div className='product-img-div'>
              <img className='product-img' src={product.ImageSrc} alt={`Product ${innerIndex}`} />
            </div>
            <div className='product-info-div'>
              <p className='product-name'>{product.Name}</p>
              <p className='product-info'>{product.Info}</p>
            </div>

            <div className='price-div'>
              <span className={`crossed-price crossed-price-${innerIndex}`} style={{ visibility: product.Discount > 0 ? 'visible' : 'hidden' }}>₹{product.Actual_Price}</span>
              <span className='actual-price'>₹{product.Price}</span>
              <button className={`products-add-btn products-add-btn-${innerIndex}`} onClick={() => AddProduct(innerIndex)} style={{ visibility: product.Quantity > 0 ? 'hidden' : 'visible' }}>
                Add
              </button>

              <div className={`products-add-buttons-div products-add-buttons-div-${innerIndex}`} style={{ visibility: product.Quantity > 0 ? 'visible' : 'hidden' }}>
                <button className={`product-decrease-btn product-decrease-btn-${innerIndex}`}onClick={() => ProductsQty('-', innerIndex,product.Quantity)}> ⎯ </button>
                <button className={`product-value-btn product-value-btn-${innerIndex}`}>{product.Quantity}</button>
                <button className={`product-increase-btn product-increase-btn-${innerIndex}`}onClick={() => ProductsQty('+', innerIndex,product.Quantity)}> + </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className='Shoutout-btn'><img src="images1/shout.png"></img>Only 10 unit(s) of this can be added per order</button>
    </div>
  );
};

export default HomeProducts;

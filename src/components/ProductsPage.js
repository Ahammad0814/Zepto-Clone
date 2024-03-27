import React, { useState, useEffect } from 'react';
import { TotalDataAPI } from './Data';
import './ProductsPage.css';
import Header from './header';
import Bottom from './bottom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductsPage = () => {
  let history = useNavigate();
  let CategoryData = parseInt(localStorage.getItem('Category'));
  let ChooseDataAPI = TotalDataAPI[CategoryData]

  const [ProductsData, setProductsData] = useState([])

  useEffect(() => {
    fetchData();
}, []);

  const fetchData = async () => {
    try {
        let api = await axios({
            url: ChooseDataAPI,
            method: "GET",
        });
        let apiResponse = api;
        if (apiResponse.data.length > 0) {
          setProductsData(apiResponse.data);
        } else {
          setProductsData([]);
        }
    } catch (error) {
        console.log(error);
    }
};

  const DataArray = JSON.parse(localStorage.getItem(`UpdatedDataArray${CategoryData}`)) || ProductsData;

  const [CartProducts, setCartProducts] = useState(() => {
    const storedCartData = JSON.parse(localStorage.getItem(`CartData_${CategoryData}`)) || [];
    return storedCartData;
  });

  useEffect(() => {
    localStorage.setItem(`CartData_${CategoryData}`, JSON.stringify(CartProducts));
  }, [CartProducts]);

  const AddProductToCart = (id, quantity) => {
    const cartData = JSON.parse(localStorage.getItem(`CartData_${CategoryData}`)) || [];
    const existingProductIndex = cartData.findIndex((product) => product.id === id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cartData];
      if (quantity === 0) {
        updatedCart.splice(existingProductIndex, 1);
      } else {
        updatedCart[existingProductIndex].Quantity = quantity;
      }
      localStorage.setItem(`CartData_${CategoryData}`, JSON.stringify(updatedCart));
    } else if (quantity > 0) {
      const newProduct = {
        id: id,
        Discount: DataArray[id].Discount,
        ImageSrc: DataArray[id].ImageSrc,
        Name: DataArray[id].Name,
        Info: DataArray[id].Info,
        Actual_Price: DataArray[id].Actual_Price,
        Price: DataArray[id].Price,
        Quantity: quantity,
      };
      localStorage.setItem(`CartData_${CategoryData}`, JSON.stringify([...cartData, newProduct]));
    }
  };  

  useEffect(() => {
    localStorage.setItem(`CartData_${CategoryData}`, JSON.stringify(CartProducts));
  }, [CartProducts]);

  const AddProduct = (id) => {
    let UpdatedDataArray = [...DataArray];
    let DataValue = UpdatedDataArray[id].Quantity += 1;
    localStorage.setItem(`UpdatedDataArray${CategoryData}`, JSON.stringify(UpdatedDataArray));
    AddProductToCart(id, DataValue);
    history('');
  };

  const ProductsQty = (element, id, quantity) => {
    let UpdatedDataArray = [...DataArray];
      let TotalQty = quantity;
      if (TotalQty < 11) {
        if (element === '-') {
          UpdatedDataArray[id].Quantity -= 1;
          localStorage.setItem(`UpdatedDataArray${CategoryData}`, JSON.stringify(UpdatedDataArray))
        }
      }
      if (TotalQty < 10) {
        if (element === '+') {
          UpdatedDataArray[id].Quantity += 1;
          localStorage.setItem(`UpdatedDataArray${CategoryData}`, JSON.stringify(UpdatedDataArray))
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
    <div>
      <Header />
      <h2 className='PageTitle'>Buy {JSON.parse(localStorage.getItem('CategoryName'))}</h2>
      <div className='product-div'>
        {DataArray.map((product, index) => (
          <div key={index} className='products-inner-div'>
            <span className='discount' style={{ visibility: product.Discount > 0 ? 'visible' : 'hidden' }}>{product.Discount}% Off</span>
            <div className='product-img-div'>
              <img className='product-img' src={product.ImageSrc} alt={`Product ${index}`} />
            </div>
            <div className='product-info-div'>
              <p className='product-name'>{product.Name}</p>
              <p className='product-info'>{product.Info}</p>
            </div>

            <div className='price-div'>
              <span className='crossed-price' style={{ visibility: product.Discount > 0 ? 'visible' : 'hidden' }}>₹{product.Actual_Price}</span>
              <span className='actual-price'>₹{product.Price}</span>
              <button className={`products-add-btn products-add-btn-${index}`} onClick={() => AddProduct(index)} style={{visibility : product.Quantity > 0 ? 'hidden' : 'visible'}}>
                Add
              </button>

              <div className={`products-add-buttons-div products-add-buttons-div-${index}`} style={{visibility : product.Quantity > 0 ? 'visible' : 'hidden'}}>
                <button
                  className={`product-decrease-btn product-decrease-btn-${index}`}
                  onClick={() => ProductsQty('-', index, product.Quantity)}
                >
                  ⎯
                </button>
                <button className={`product-value-btn product-value-btn-${index}`}>{product.Quantity}</button>
                <button
                  className={`product-increase-btn product-increase-btn-${index}`}
                  onClick={() => ProductsQty('+', index, product.Quantity)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className='Shoutout-btn'>
        <img src='images1/shout.png' alt='Shoutout' />
        Only 10 unit(s) of this can be added per order
      </button>
      <Bottom />
    </div>
  );
};

export default ProductsPage;

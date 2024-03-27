import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bottom = () => {
    const [CategoryProducts,setCategoryProducts] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
      
    const fetchData = async () => {
      try {
          let api = await axios({
              url: "http://127.0.0.1:8000/category/",
              method: "GET",
          });
          let apiResponse = api;
          if (apiResponse.data.length > 0) {
            setCategoryProducts(apiResponse.data);
          } else {
            setCategoryProducts([]);
          }
      } catch (error) {
          console.log(error);
      }
    };

    const scrollToTop = () => {
        window.scrollTo({
          top: 0
        });
      };
    const NavigatePage = (id) => {
        localStorage.setItem('Category', `${id}`)
        localStorage.setItem('CategoryName', JSON.stringify(CategoryProducts[id].Name))
        window.location.href = '/products';
        }

  return (
    <div className='Bottom-Class-Div'>
      <p className="how-it-works-txt">How it Works</p>
        <div className="instruction-div">
            <div className="instruction-inner-div">
                <img className="instruction-img1" src="images1/place-order.png"></img>
                <p className="I_txt1">Place an order</p>
                <p className="I_txt2">Choose from a wide range of daily essentials</p>
            </div>
            <div className="instruction-inner-div">
                <img className="instruction-img2" src="images1/dont-blink.png"></img>
                <p className="I_txt1">Don't Blink</p>
                <p className="I_txt2">Our delivery partner will be at your door</p>
            </div>
            <div className="instruction-inner-div">
                <img className="instruction-img3" src="images1/enjoy.png"></img>
                <p className="I_txt1">Enjoy</p>
                <p className="I_txt2">Boom! You'll never have to wait for groceries again</p>
            </div>
        </div>

        <div className='Horizontal-line'></div>

        <p className="category-bottom-title">Categories</p>
        <div className="Catogories-text-select">
            {CategoryProducts.map((list, index) => {
                return(
                <span onClick={()=>{NavigatePage(index); scrollToTop();}} data-value={index}>{list.Name}</span>
                );
            })}
        </div>

        <div className='Horizontal-line'></div>

        <div className="bottom-home-logo-div">
            <img onClick={scrollToTop} className="bottom-logo" src="images1/Zepto-logo.png"></img>
            <p>© Ahammad Ali</p>
        </div>
    </div>
        )
        }

export default Bottom

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const history = useNavigate();
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

  const NavigateProductsPage = (id) => {
    localStorage.setItem('Category', `${id}`)
    localStorage.setItem('CategoryName', JSON.stringify(CategoryProducts[id].Name))
    history('/products');
  };

  return (
    <div className='Category-main-div'>
    <h2>Explore by Category</h2>
    <div className='category-div'>
        {CategoryProducts.map((product, index)=>{
        return(
        <div className='category-inner-div'>
            <img onClick={()=>{NavigateProductsPage(index); scrollToTop();}} className={`category-img category-img-${index}`} src={product.ImageSrc}></img>
        </div>
        );
        })}
    </div>

    </div>
  )
}

export default Category;
import React from 'react';
import './header.css';

const SubHeader = () => {
  return (
    <div className='subheader-main-div'>
      <div className='subheader-inner-div'>
        <img className='delivery-img-left' src="images1/Delivery-min-left.png"></img>
        <button className='delivery-time'>Delivery in <br></br><span>10</span> min</button>
        <img className='delivery-img-right' src="images1/Delivery-min-right.png"></img>
      </div>
      <center>
        <img className='welcome-logo' src="images1/Welcome-logo.png"></img>
      </center>
    </div>
  )
}

export default SubHeader;

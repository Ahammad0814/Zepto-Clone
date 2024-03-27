import React from 'react';
import Header from './header';
import './header.css';
import Bottom from './bottom';

const ServiceAvailability = () => {
  return (
    <div className='notdelivery-main-div'>
    <div className='notdelivery-div'>
      <Header />
      <img className='notdelivery-logo' src='images1/undelivarable-logo.png'></img>
      <h3>Sit Tight! We're Coming Soon!</h3>
      <p>Our team is working tirelessly to bring 10 minute deliveries to your location</p>
      <h4>Please choose another location!</h4>
    </div>
    <Bottom />
    </div>
  )
}

export default ServiceAvailability;

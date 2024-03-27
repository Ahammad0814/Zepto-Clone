import React, { useState } from 'react';
import Header from './header';
import SubHeader from './subheader';
import ForYouProducts from './forYouProducts';
import Category from './category';
import Bottom from './bottom';
import HomeProducts from './homeProducts';

const HomeApp = () => {
  return (
    <div>
      <Header />
      <SubHeader />
      <ForYouProducts/>
      <Category />
      <HomeProducts />
      <Bottom />
    </div>
  )
}

export default HomeApp;
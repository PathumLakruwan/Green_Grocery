import React from 'react'
import CategoryList from '../components/CategoryList'
import ProductBanners from '../components/ProductBanners'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VertialCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className='bg-white'>
      <CategoryList/>
      <ProductBanners/>

      <HorizontalCardProduct category ={'vegetables'} heading={'Top Vegetables in Rating'}/>
      <HorizontalCardProduct category ={'fruits'} heading={'Top Fruits in Rating'}/>
      <HorizontalCardProduct category ={'leaves'} heading={'Top Leaves in Rating'}/>

      <VertialCardProduct category ={'vegetables'} heading={'Top Rating Products'}/>
      <VertialCardProduct category ={'fruits'} heading={'Top Rating Products'}/>
    </div>
  )
}

export default Home

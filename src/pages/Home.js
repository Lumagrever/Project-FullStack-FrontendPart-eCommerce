import React, { useEffect, useState } from 'react'
import Banner from "../components/Banner";
import Products from "../components/Products";
import { useLoaderData } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
const data = require('../data/productsJson.json')
useEffect(() => {
  setProducts(data)
}, [data]);
  return (
    <div>
      <Banner />
      <div className='w-full'>
      <Products products={products}/>
      </div>
    </div>
  )
}

export default Home
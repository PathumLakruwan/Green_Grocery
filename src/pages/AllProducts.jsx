import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

export default function AllProducts() {

  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.getProduct.url,{
      method: 'get',
    })

    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>

      <div className=' bg-slate-600 py-2 px-4 flex justify-between items-center'>
        <h1 className=' font-semibold'> All Products </h1>
        <button className=' rounded-full py-1 px-3 border-2 border-blue-700 font-semibold hover:bg-blue-500 text-white'onClick={()=>setOpenUploadProduct(true)}>Upload Products</button>
      </div>


      {/* All Products */}
      {/* overflow-auto h-[calc(100vh-190px)] */}
      <div className=' flex items-center gap-4 py-4 flex-wrap ' > 
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index+'allProduct'} fetchData = {fetchAllProduct}/>
            )
          })
        }
      </div>



      { //uploadProduct
        openUploadProduct && (
          <UploadProduct onClose={()=> setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }
      
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import img1 from '../assets/banners/b-1.jpg'
import img2 from '../assets/banners/b-2.jpg'
import img3 from '../assets/banners/b-3.jpg'

import mimg1 from '../assets/banners/mb-1.jpg'
import mimg2 from '../assets/banners/mb-2.jpg'
import mimg3 from '../assets/banners/mb-3.jpg'

import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";

const ProductBanners = () => {

    const [currentImg,setCurrentImg] = useState(0)

    const desktopImg = [img1,img2,img3]
    const mobileImg = [mimg1,mimg2,mimg3]

    const nextImg = ()=>{
      if(desktopImg.length -1 > currentImg){
        setCurrentImg(preve => preve + 1)
      }
    }

    const preveImg = ()=>{
      if(currentImg!=0){
        setCurrentImg(preve => preve - 1)
      }
    }

    // to slide the banners
    useEffect(() =>{
      const interval = setInterval(()=>{
        if(desktopImg.length -1 > currentImg){
          nextImg()
        }else{
          setCurrentImg(0)
        }
      },3000)
      return ()=> clearInterval(interval)
    },[currentImg])

  return (
    <div className=' container mx-auto px-4 rounded'>
      <div className=' h-60 md:h-72 w-full bg- bg-yellow-400 mx-auto rounded-lg relative'>

        <div className= ' absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className= 'flex justify-between w-full text-2xl p-2'>
            <button className=' shadow-lg rounded-full' onClick={preveImg}>
              <IoIosArrowDropleft/>
            </button>

            <button className=' shadow-lg rounded-full' onClick={nextImg}>
            <IoIosArrowDropright/>
            </button>
          </div>
        </div>

        {/* Display Imgs in Desktop */}
        <div className='hidden md:flex w-full h-full overflow-hidden'>
        {
            desktopImg.map((imgUrl,index)=>{
                return(
                    <div className='w-full h-full  min-w-full min-h-full trasnlate overflow-hidden transition-all' key={imgUrl}
                    style={{ transform: `translateX(-${currentImg * 100}%)` }}>
                        <img src={imgUrl} className='w-full h-full object-cover rounded-lg' />
                    </div>
                )
        })

        }
        </div>

        {/* Display Img in Mobile */}
        <div className='flex w-full h-full overflow-hidden md:hidden'>
        {
            mobileImg.map((imgUrl,index)=>{
                return(
                    <div className='w-full h-full  min-w-full min-h-full trasnlate overflow-hidden transition-all' key={imgUrl} 
                    style={{ transform: `translateX(-${currentImg * 100}%)` }}>
                        <img src={imgUrl} className='w-full h-full object-cover rounded-lg' />
                    </div>
                )
        })

        }
        </div>
      </div>
    </div>
  )
}

export default ProductBanners

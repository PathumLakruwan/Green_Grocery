import React, { useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import productCategory from '../helpers/productCategory'
import { MdOutlineCloudUpload } from "react-icons/md";
import uploadImg from '../helpers/uploadImg';
import DisplayImage from './DisplayImage';
import { MdOutlineDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'


const AdminEditProduct = ({
    onClose,
    productData,
    fetchData

}) => {
    
    const[data,setData] = useState({
        ...productData,
        productName: productData?.productName,
        category: productData?.category,
        productImg: productData?.productImg || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })

    const[openFullScreenImg, setOpenFullScreenImg] = useState(false)
    const [fullScreenImg, setFullScreenImg] = useState('')

    //const [UploadProductImgInput, setUploadProductImgInput] = useState("")

    const handleOnChange =(e) =>{
        const{name,value} = e.target
        setData((preve) =>{
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadProduct = async(e) =>{
        const file = e.target.files[0]
        // setUploadProductImgInput(file.name)
        // console.log('file',file)

        const uploadImgCloudinary = await uploadImg(file)

        setData((preve) =>{
            return {
                ...preve,
                productImg: [...preve.productImg, uploadImgCloudinary.url]
            }
        })

        // console.log('upload Image', uploadImgCloudinary.url)
    }

    const handleDeleteProductImg = async(index) =>{
        console.log('imageIndex',index)

        const newProductImg = [...data.productImg]
        newProductImg.splice(index,1)

        setData((preve) =>{
            return {
                ...preve,
                productImg: [...newProductImg]
            }
        })
    }

    //Upload Products
    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log('data',data)

        const response = await fetch(SummaryApi.updateProduct.url,{
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }
        if(responseData.error){
            console.log('error',data)
            toast.error(responseData?.message)
        }

    }

  return (
    <div className=' fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center '>

      <div className='bg-yellow-500 p-4 rounded-xl w-full max-w-2xl h-full  max-h-[80%] overflow-hidden'>

        <div className=' flex justify-between items-center pb-4 '>
            <h2 className='text-2xl font-bold'>Edit Product</h2>
            <div className=' w-fit ml-auto font-bold hover:text-red-600 cursor-pointer' onClick={onClose}>
                <AiOutlineCloseCircle/>
            </div>
        </div>

        <form className='grid p-4 gap-1 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
        <label htmlFor="productName" className='mt-3'>Product Name</label>
            <input 
                type="text" 
                id='productName' 
                placeholder='Enter Product Name Here'
                name='productName'
                value={data.productName} 
                onChange={handleOnChange}
                className='p-1 bg-slate-100 rounded-xl boeder'
                required/>

        
        <label htmlFor="category" className='mt-3'>Product Category</label>
            <select required value={data.category} onChange={handleOnChange} name='category' className='p-1 bg-slate-100 rounded-xl boeder'>
                
            {
                productCategory.map((el,index)=>{
                    return(
                        <option value={el.value} key={el.value+index}>{el.label}</option>
                    )
                })
            }
            </select>
            
        <label htmlFor="productImg" className='mt-3'>Product Image</label>
            <label htmlFor="uploadImgInput">
                <div className='p-2 bg-blue-50 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                    <div className=' flex justify-center items-center flex-col'>
                        <span className='text-3xl'>
                            <MdOutlineCloudUpload />
                        </span>
                        <p className=' text-xs'>Upload Product Images</p>
                        <input type="file" id='uploadImgInput' className=' hidden' onChange={handleUploadProduct}/>
                    </div>
                
                </div>
            </label>
            <div className=''>
                {
                    data?.productImg [0] ? (
                        <div className='flex items-center gap-2'>
                            { 
                                data.productImg.map((el,index)=>{
                                    return(
                                        <div className='relative group'>

                                            <img src={el} alt={el} width={80} height={80} className=' cursor-pointer' onClick={()=>{
                                            setOpenFullScreenImg(true)
                                            setFullScreenImg(el)}   
                                            }/>

                                            <div className=' absolute bottom-0 right-0 p-1 bg-red-700 rounded-full text-white text-xs hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImg(index)}>
                                                <MdOutlineDelete />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ):(
                        <p className='text-red-800 text-xs'> *Upload Product Image! </p>
                    )
                }
            </div>

            <label htmlFor="price" className='mt-3'>price</label>
            <input 
                type="number" 
                id='price' 
                placeholder='Enter Price Here'
                name='price'
                value={data.price} 
                onChange={handleOnChange}
                className='p-1 bg-slate-100 rounded-xl boeder'
                required/>

            <label htmlFor="sellingPrice" className='mt-3'>sellingPrice </label>
            <input 
                type="number" 
                id='sellingPrice' 
                placeholder='Enter Selling Price Here'
                name='sellingPrice'
                value={data.sellingPrice} 
                onChange={handleOnChange}
                className='p-1 bg-slate-100 rounded-xl boeder'
                required/>


            <label htmlFor="description" className='mt-3'>Product Description</label>
            <textarea 
                type="text" 
                id='description' 
                placeholder='Enter Product description Here'
                name='description'
                value={data.description} 
                onChange={handleOnChange}
                className='p-1 bg-slate-100 rounded-xl boeder h-32'
                required/>
                

            <button className='px-4 bg-red-400 text-white mb-10 hover:bg-red-700 rounded-lg'>Edit Product</button>

        </form>
      </div>

      {/*Display Image in Full Size */}
      {
        openFullScreenImg && (
            <DisplayImage onClose={()=>setOpenFullScreenImg(false)} imgUrl = {fullScreenImg}/>
        )
      }
      
    </div>

    

  )
}

export default AdminEditProduct



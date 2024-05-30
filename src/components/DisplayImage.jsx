import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>

        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto '>

            <div className=' w-fit ml-auto font-bold hover:text-red-600 cursor-pointer' onClick={onClose}>
                <AiOutlineCloseCircle/>
            </div>

        <div className='flex justify-center p-4 max-h-[70vh] max-w-[70vh]'>
            <img src={imgUrl} alt="" className=' h-full w-full'/>
        </div>

        </div>
        
    </div>
  )
}

export default DisplayImage

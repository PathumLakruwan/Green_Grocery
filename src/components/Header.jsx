import React, { useCallback, useState } from 'react'
import Logo from '../assets/logo.png'
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast , ToastContainer} from 'react-toastify';






export default function Header() {

    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay,setMenuDisplay] = useState(false)


    console.log('userHeader',user)

    // const handleLogout =useCallback (async()=>{
    //     const fetchData = await fetch(SummaryApi.logout.url,{
    //         method: SummaryApi.logout.method,
    //         credentials: 'include'
    //     })
    //     const data = await fetchData.json()
    //     if(data.success){
    //         toast.success(data.message)
    //     }
    //     if(data.error){
    //         toast.error(data.message)
    //     }
    // })

    const handleLogout = useCallback(async () => {
        if (window.confirm('Are you sure you want to log out?')) {
          try {
            const fetchData = await fetch(SummaryApi.logout.url, {
              method: SummaryApi.logout.method,
              credentials: 'include'
            })
            const data = await fetchData.json()
            if (data.success) {
              toast.success(data.message)
              dispatch(setUserDetails(null))
            }
            if (data.error) {
              toast.error(data.message)
            }
          } catch (error) {
            console.error(error)
            toast.error('An error occurred while logging out')
          }
        }
      }, [toast,dispatch])


  return (
    <header className="h-16 shadow-md w-full bg-slate-500 fixed z-40">

        <div className="h-full container mx-auto flex items-center px-3 justify-between">
            <div className=''>
                <Link to = "/home">
                    <img className='rounded w-14 h-14 mx-auto' src= {Logo} alt='logo-icon'/>
                </Link>
            </div>

            <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-4">
                <input type="text" placeholder='Search Here!   ' className=" w-full outline-none" />
                <div className="text-lg min-w-[50px] h-8 flex items-center justify-center bg-blue-400 rounded-r-full">
                    <IoSearch/>
                </div>
            </div>

            <div className="flex items-center gap-6">

                <div className=' relative group flex justify-center'>
                    <div className="text-3xl cursor-pointer" onClick={()=>setMenuDisplay(prev =>!prev)}>
                        {
                            user?.profilePic?(
                                <img src = {user?.profilePic} className='w-10 h-10 rounded-full' alt='profile-pic'/>
                            ):(
                                <FaRegCircleUser/>
                            )
                        }
                    </div>
                        {
                            menuDisplay && (
                                <div className=' absolute bg-blue-200 bottom-0 top-11 h-fit p-2 shadow-lg rounded group-hover:block'>
                            <nav>
                                <Link to = {'adminPanel'} className=' whitespace-nowrap hidden md:block hover:bg-blue-300'>Admin Panel</Link>
                            </nav>
                        </div>
                            )
                        }
                    </div>

                <div className="text-3xl cursor-pointer relative">
                    <span> <MdOutlineShoppingCart /> </span>
                    <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2">
                        <p className="text-sm">0</p>
                    </div>
                </div>

                <div>
                    {
                        user?._id ? (
                            <button onClick={handleLogout} className="bg-blue-600 text-white hover:bg-blue-300 rounded-xl px-2 py-1.5 mx-auto">Logout</button>
                        ):(
                            <Link to ={"/login"} className="bg-blue-600 text-white hover:bg-blue-300 rounded-xl px-2 py-1.5 mx-auto">Login</Link>
                        )
                    }
                </div>

            </div>

        </div>

    </header>
  )
}


import React,{useState} from 'react'
import { Route,Link,useNavigate, Navigate} from 'react-router-dom'
import RegisterIcon from '../assets/registerUser.png'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../common';
import toast from 'react-hot-toast';


export default function Register() { 
  const [showPassword,setShowPassword] = useState(false)
  const[confirmPassword,setConfirmPassword]=useState(false)

  const[data,setData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, userName, email, password, confirmPassword } = data;
    setData({...data, [e.target.name]: e.target.value});
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
  
    if (data.password !== data.confirmPassword) {
      toast.error('Double Check Your Password, Passwords are Not Matching!')
      return;
    }
    try {
      const response = await fetch(SummaryApi.register.url, {
        method: SummaryApi.register.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      console.log('responseData', responseData);

      if(responseData.error){
        toast.error(responseData.message)
      }else{
        setData({})
        toast.success(responseData.message)
        navigate('/login')
      }

    } catch (error) {
      console.error('Error submitting form:', error);
    };
  }

  return (
    <div className=' '>
      <section id='register '>
        <div className=' mx-auto container px-5'>

        <div className='p-2 w-full max-w-md mx-auto mt-4'>
            
            <div>
              <img className=' rounded w-20 h-20 mx-auto' src= {RegisterIcon} alt="register icon" />
            </div>

            <form className='mt-4 grid mb-4' onSubmit={handleOnSubmit}>

              <label> Full Name </label>
              <input 
                type="text"
                placeholder='Pathum Lakruwan K.W.R.'
                name='name'
                value={data.name}
                onChange={handleOnChange}
                className='w-full h-full mx-auto bg-transparent rounded' />

              <label> User Name </label>
              <input 
                type="text"
                placeholder='PathumL'
                name='userName'
                value={data.userName}
                onChange={handleOnChange}
                className='w-full h-full mx-auto bg-transparent rounded' />   

              <label> Email Addres</label>
              <input 
                type="email"
                placeholder='pathum@gmail.com'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                className='w-full h-full mx-auto bg-transparent rounded' />
                

              <label> Password</label>
              <div className=' flex'> 
              <input 
                type= {showPassword? 'text' : 'password'}
                placeholder='******'
                name='password'
                value={data.password}
                onChange={handleOnChange}
                className='w-full h-full mx-auto bg-transparent rounded' />
                <div className=' cursor-pointer text-lg' onClick={() => setShowPassword((preve) => !preve)}>
                  <span>
                    {
                      showPassword?(
                        <FaEyeSlash/>
                      ):(
                        <FaEye/>
                      )
                    }
                  </span>
                </div>
              </div>

              <label> Confirm Password</label>
              <div className=' flex'> 
              <input 
                type= {confirmPassword? 'text' : 'password'}
                placeholder='******'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleOnChange}
                className='w-full h-full mx-auto bg-transparent rounded' />
                <div className=' cursor-pointer text-lg' onClick={() => setConfirmPassword((preve) => !preve)}>
                  <span>
                    {
                      confirmPassword?(
                        <FaEyeSlash/>
                      ):(
                        <FaEye/>
                      )
                    }
                  </span>
                </div>
              </div>

              <button className='bg-blue-500 text-white px-4 py-2 grid-full max-w-[150px] rounded-xl hover:scale-110 transition-all mx-auto block mt-4 text-center font-semibold'>Create</button>

            </form>

            <p className=' text-sm mx-auto text-center'>Have an Account ? <Link to='/login' className=' hover:text-blue-400'> Login </Link></p>

        </div>
        </div>
      </section>
    </div>
  )
}


 // const handleOnSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (data.password === data.confirmPassword) {
  //       const response = await fetch(SummaryApi.register.url, {
  //         method: SummaryApi.register.method,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data),
  //       });
  //         const responseData = await response.json();
  //         console.log('responseData', responseData);
  //     } else {
  //       console.log('Double Check Your Password, Passwords are Not Matching!');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  // const handleOnSubmit = async (e) =>{
  //   e.preventDefault();
  //   //const{name,username,email,password,confirmPassword} = data;

  //   if(data.password === data.confirmPassword){
  //     const dataResponse = await fetch('http://localhost:8000',{
  //       method: SummaryApi.register.method,
  //       headers:{
  //         'content-type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //   })
  //   console.log(dataResponse)

  //   const dataApi = await dataResponse.json();
  //   console.log('data',dataApi)
  //   }else{
  //     console.log('Double Check Your Password,Passwords are Not Matching!')
  //   }
  // } 















































/*

import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  
  const navigate = useNavigate()
  
  const [data, setData] = useState({
    name:'',
    email:'',
    password:'',
  })

  const registerUser = async (e) =>{
    e.preventDefault()
    const{name,email,password} = data

    

    try {
      const {data} = await axios.post('/register',{
        name,email,password
      })
      if(data.error){
        toast.error(data.error)
      }else{
        setData({})
        toast.success('Login Successful,Welcome!')
        navigate('/login')
      }

    } catch (error) {
      console.log(error)
      toast.error('Error registering user: ' + error);

    }
  }



  return (
    <div>
      <form>

        <label>Name</label>
        <input type="text" placeholder='Enter the Name :' value={data.name} onChange={(e) => setData({...data, name:e.target.value})}/>

        <label>Email</label>
        <input type="email" placeholder='Enter the Email :' value={data.email} onChange={(e) => setData({...data, email:e.target.value})}/>

        <label>Password</label>
        <input type="password" placeholder='Enter the Password :' value={data.password} onChange={(e) => setData({...data, password:e.target.value})}/>
        
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
  
}

import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const registerUser = async (e) => {
    e.preventDefault()
    const { name, email, password } = data

    try {
      const newUser = new User({
        name,
        email,
        password,
      });

      const savedUser = await newUser.save();
      if (savedUser) {
        setData({});
        toast.success('User registered successfully!');
        navigate('/login');
      }

      const { data } = await axios.post('/register', {
        name, email, password
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Login Successful,Welcome!')
        navigate('/login')
      }

    } catch (error) {
      console.log(error)
      toast.error('Error registering user: ' + error);
    }
  }

  return (
    <div>
      <form>

        <label>Name</label>
        <input type="text" placeholder='Enter the Name :' value={data.name} onChange={(e) => setData({...data, name:e.target.value})}/>

        <label>Email</label>
        <input type="email" placeholder='Enter the Email :' value={data.email} onChange={(e) => setData({...data, email:e.target.value})}/>

        <label>Password</label>
        <input type="password" placeholder='Enter the Password :' value={data.password} onChange={(e) => setData({...data, password:e.target.value})}/>
        
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

*/

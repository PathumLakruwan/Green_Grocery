import './App.css'
import { Route,Routes } from 'react-router-dom'
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from '../src/pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
//import UserContext from '../context/userContext';
import Dashboard from './pages/DashBoard';
import Header from './components/Header';
import ForgotPassword from './pages/ForgotPassword';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import React , { useEffect,useState} from 'react';
import SummaryApi from './common';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import AllUsers from './pages/AllUsers';
import AllProducts from './pages/AllProducts';
import ChangeUserRole from './components/changeUserRole';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials= true;


function App() {

  const dispatch = useDispatch()

  const fetchUserDetails = async()=>{
    const DataResponse = await fetch(SummaryApi.currentUser.url,{
      method:SummaryApi.currentUser.method,
      credentials: 'include'
    })
    const dataApi = await DataResponse.json()

   if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    } 

    console.log('data-user',DataResponse)
  }
  
  useEffect(()=>{
    fetchUserDetails()
  },[])

  return (
    
      <UserContextProvider value = {{
      fetchUserDetails
    }}>
      <Header/>
      <main className='pt-16'>
      <Toaster position='top-right' toastOptions={{duration: 4000}} />
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path = '/login' element = {<Login/>}> </Route>
        <Route path = '/forgotPassword' element = {<ForgotPassword/>}/>
        <Route path = '/adminPanel' element = {<AdminPanel/>}/>
          <Route path = 'allUsers' element= {<AllUsers/>}/>
          <Route path = 'allProducts' element= {<AllProducts/>}>
        </Route>
        <Route path='/productCategory' element = {<ProductCategory/>} />
        <Route path='changeUserRole' element = {<ChangeUserRole/>}/>
        <Route path='home/product/:id' element = {<ProductDetails/>}/>   
        </Routes>
      </main>
      
        <Navbar/>
        <Footer/>
        
    </UserContextProvider>
  
    
    
  )
  
}

export default App

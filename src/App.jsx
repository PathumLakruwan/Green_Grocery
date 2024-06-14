import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {Toaster} from 'react-toastify'
// import {ToastProvider} from 'react-toastify'
import { UserContextProvider } from "../context/userContext";
//import UserContext from '../context/userContext';
import Dashboard from "./pages/DashBoard";
import Header from "./components/Header";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/Footer";
import AdminPanel from "./pages/AdminPanel";
import React, { useEffect, useState } from "react";
import SummaryApi from "./common";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import AllUsers from "./pages/AllUsers";
import AllProducts from "./pages/AllProducts";
import ChangeUserRole from "./components/changeUserRole";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Context from "./context";
import Cart from "./pages/Cart";
import SearchProduct from "./pages/SearchProduct";
import UserReceipts from "./pages/userOrderDashBoard";
import Report from "./pages/ReportDetails";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  const [cartProductCount, setCartProductCount] = useState();

  const fetchUserDetails = async () => {
    const DataResponse = await fetch(SummaryApi.currentUser.url, {
      method: SummaryApi.currentUser.method,
      credentials: "include",
    });
    const dataApi = await DataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const DataResponse = await fetch(SummaryApi.countAddToCartProduct.url, {
      method: SummaryApi.countAddToCartProduct.method,
      credentials: "include",
    });

    const dataApi = await DataResponse.json();
    console.log("DataApiiiiii", dataApi);

    setCartProductCount(dataApi?.data?.count);
    console.log("Cart product count set to:", cartProductCount);
  };

  useEffect(() => {
    //UserDetails
    fetchUserDetails();
    // UserCart
    fetchUserAddToCart();
  }, []);

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
        cartProductCount, //Current User product count in
        fetchUserAddToCart,
      }}
    >
      <Header />
      <main className="pt-16">
        <ToastContainer
          position="top-right"
          toastOptions={{ duration: 4000 }}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}>
            {" "}
          </Route>
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="allUsers" element={<AllUsers />} />
          <Route path="allProducts" element={<AllProducts />}/>
          <Route path="/productCategory/:category" element={<ProductCategory />}/>
          <Route path="changeUserRole" element={<ChangeUserRole />} />
          <Route path="home/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/dashBoard" element={<Dashboard />} />
          <Route path="/userReceipt" element={<UserReceipts />} />
          <Route path="/generateReport" element={<Report />} />
        </Routes>
      </main>

      {/* <Navbar/> */}
      <Footer />
    </Context.Provider>
  );
}

export default App;

import React, { useState } from "react";
import { Route, Link, useNavigate, Navigate } from "react-router-dom";
import RegisterIcon from "../assets/registerUser.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from "../common";
import {toast} from "react-toastify";
import imageToBase64 from "../helpers/imageToBase64";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    address: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, userName, email,address, password, confirmPassword } = data;
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields

    if (data.password !== data.confirmPassword) {
      toast.error("Double Check Your Password, Passwords are Not Matching!");
      return;
    }
    try {
      const response = await fetch(SummaryApi.register.url, {
        method: SummaryApi.register.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("responseData", responseData);

      if (responseData.error) {
        toast.error(responseData.message);
      } else {
        setData({});
        toast.success(responseData.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className=" ">
      <section id="register ">
        <div className=" mx-auto container px-5">
          <div className="p-2 w-full max-w-md mx-auto mt-4">
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <div>
                <img
                  src={data?.profilePic || RegisterIcon}
                  className=" rounded w-20 h-20 mx-auto"
                  alt="register icon"
                />
              </div>
              <form>
                <label>
                  <div className="text-xs bg-slate-100 py-4 text-center absolute bottom-0 w-full bg-opacity-50 pb-4 cursor-pointer">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    className=" hidden"
                    onChange={handleUploadPic}
                  />
                </label>
              </form>
            </div>

            <form className="mt-4 grid mb-4" onSubmit={handleOnSubmit}>
              <label> Full Name </label>
              <input
                type="text"
                placeholder="Pathum Lakruwan K.W.R."
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="w-full h-full mx-auto bg-transparent rounded"
              />

              <label> User Name </label>
              <input
                type="text"
                placeholder="PathumL"
                name="userName"
                value={data.userName}
                onChange={handleOnChange}
                required
                className="w-full h-full mx-auto bg-transparent rounded"
              />

              <label> Email Addres</label>
              <input
                type="email"
                placeholder="pathum@gmail.com"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="w-full h-full mx-auto bg-transparent rounded"
              />

              <label> Shop Address</label>
              <input
                type="text"
                placeholder="17 | 19 A, Ambalangoda"
                name="address"
                value={data.address}
                onChange={handleOnChange}
                required
                className="w-full h-full mx-auto bg-transparent rounded"
              />

              <label> Password</label>
              <div className=" flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full mx-auto bg-transparent rounded"
                />
                <div
                  className=" cursor-pointer text-lg"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

              <label> Confirm Password</label>
              <div className=" flex">
                <input
                  type={confirmPassword ? "text" : "password"}
                  placeholder="******"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full mx-auto bg-transparent rounded"
                />
                <div
                  className=" cursor-pointer text-lg"
                  onClick={() => setConfirmPassword((preve) => !preve)}
                >
                  <span>{confirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

              <button className="bg-blue-500 text-white px-4 py-2 grid-full max-w-[150px] rounded-xl hover:scale-110 transition-all mx-auto block mt-4 text-center font-semibold">
                Create
              </button>
            </form>

            <p className=" text-sm mx-auto text-center">
              Have an Account ?{" "}
              <Link to="/login" className=" hover:text-blue-400">
                {" "}
                Login{" "}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

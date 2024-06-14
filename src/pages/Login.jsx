import React, { useContext, useState } from "react";
import { Route, Link, useNavigate } from "react-router-dom";
import LoginIcon from "../assets/loginUser.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  // console.log('generalContext',generalContext.fetchUserDetails())

  const handleOnChange = (e) => {
    const { name, value } = data;
    setData({ ...data, [e.target.name]: e.target.value });
    setData((preve) => {
      return { ...preve, [name]: value };
    });
  };

  //console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, password } = data;

    try {
      const response = await fetch(SummaryApi.login.url, {
        method: SummaryApi.login.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      //console.log('responseData', responseData);

      if (responseData.error) {
        toast.error(responseData.message);
      } else {
        setData({
          userName: "",
          password: "",
        });

        toast.success(responseData.message);
        navigate("/home");
        fetchUserDetails();
        fetchUserAddToCart();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section id="login">
      <div className="mx auto container px-5">
        <div className="p-2 w-full max-w-md mx-auto  mt-4">
          <div>
            <img
              className="rounded w-20 h-20 mx-auto"
              src={LoginIcon}
              alt="login icon"
            />
          </div>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="grid mx-auto">
              <label> User Name</label>
              <div className="bg-blue-100 p-2 rounded-lg flex items-center">
                <input
                  type="text"
                  placeholder="Enter the User Name"
                  name="userName"
                  value={data.userName}
                  onChange={handleOnChange}
                  className="w-full h- full mx-auto bg-transparent rounded"
                />
                <span>
                  <MdEmail className="text-xl" />
                </span>
              </div>

              <label>Password</label>
              <div className="bg-blue-100 p-2 rounded-lg items-center flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter the Password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className=" w-full mx-auto bg-transparent rounded "
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-400 text-white px-4 py-2 grid-full max-w-[150px] rounded-xl hover:scale-110 transition-all mx-auto block mt-4 text-center font-semibold"
              >
                Login
              </button>
              <Link
                to="/forgot-password"
                className=" text-sm block w-fit ml-auto hover:text-blue-600"
              >
                Forgot Password ?
              </Link>
            </div>
          </form>

          <p className=" text-sm text-center">
            Dont Have an Account ?{" "}
            <Link to="/register" className=" hover:text-blue-400">
              {" "}
              Register{" "}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
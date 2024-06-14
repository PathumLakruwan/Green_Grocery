import React, { useCallback, useContext, useState } from "react";
import Logo from "../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast, ToastContainer } from "react-toastify";
import Context from "../context";
import { setUserDetails } from "../store/userSlice";

export default function Header() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();

  //console.log("userHeader", user);

  const handleLogout = useCallback(async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        const fetchData = await fetch(SummaryApi.logout.url, {
          method: SummaryApi.logout.method,
          credentials: "include",
        });
        const data = await fetchData.json();
        if (data.success) {
          toast.success(data.message);
          dispatch(setUserDetails(null));
          navigate("/home");
        }
        if (data.error) {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while logging out");
      }
    }
  }, [toast, dispatch]);

  const handleSearch = (e) => {
    const { value } = e.target;
    if (value) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className=" h-[70px] shadow-md w-full bg-[#006A71] fixed z-40 ">
      <div className="h-full container mx-auto flex items-center px-3 justify-between">
        <div className="">
          <Link to="/home">
            <img
              className="rounded w-14 h-14 mx-auto"
              src={Logo}
              alt="logo-icon"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-4 bg-white">
          <input
            type="text"
            placeholder="Search Here!   "
            className=" w-full outline-none "
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-8 flex items-center justify-center bg-blue-500 rounded-full text-white font-semibold">
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className=" relative group flex justify-center">
            <div
              className="text-3xl cursor-pointer"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-10 h-10 rounded-full text-white"
                  alt={user?.userName}
                />
              ) : (
                <div className="text-slate-800">
                  <FaRegCircleUser />
                </div>
              )}
            </div>
            {menuDisplay && (
              <div className=" absolute bg-blue-200 bottom-0 top-11 h-fit p-2 shadow-lg rounded group-hover:block">
                <nav className=" rounded items-center justify-center text-center flex">
                  {user?.role === "ADMIN" ? (
                    <div className="grid">
                      <Link
                        to={"/dashBoard"}
                        className=" whitespace-nowrap hidden md:block hover:bg-purple-500 rounded-full"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        DashBoard{" "}
                      </Link>
                      <Link
                        to={"/allUsers"}
                        className=" px-2 py-1 hover:bg-purple-500 rounded-full"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        AllUsers
                      </Link>
                      <Link
                        to={"/allProducts"}
                        className=" px-2 py-1 hover:bg-purple-500 rounded-full"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        AllProducts
                      </Link>
                      <Link
                        to={"/generateReport"}
                        className=" px-2 py-1 hover:bg-purple-500 rounded-full"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        Reports
                      </Link>
                      <Link
                        to={"adminPanel"}
                        className=" whitespace-nowrap hidden md:block hover:bg-purple-500 rounded-full"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        Admin Panel
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link
                        to={"/userReceipt"}
                        className=" whitespace-nowrap hidden md:block hover:bg-blue-300"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        userReceipt{" "}
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-3xl cursor-pointer relative">
              <span>
                {" "}
                <MdOutlineShoppingCart />{" "}
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white hover:bg-blue-300 rounded-xl px-2 py-1.5 mx-auto"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-blue-600 text-white hover:bg-blue-300 rounded-xl px-2 py-1.5 mx-auto"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

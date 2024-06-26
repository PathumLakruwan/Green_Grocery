import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayLKR from "../helpers/displayCurrency";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import displayKg from "../helpers/displayQuantity";

const VertialCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //to before loading display purposes
  const loadingList = new Array(15).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);
  const handelAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className=" container mx-auto px-4 my-4 relative">
      <h1 className="text-2xl font-semibold py-4">{heading}</h1>

      <div
        className=" flex items-center gap-4 md:gap-6 overflow-hidden scroll-auto"
        ref={scrollElement}
      >
        {" "}
        {/**-scroll scrollbar-none */}
        <button
          className=" shadow-lg rounded-full p-1 absolute left-0 text-lg hidden md:block transition-all"
          onClick={scrollLeft}
        >
          <IoIosArrowDropleft />
        </button>
        <button
          className=" shadow-lg rounded-full p-1 absolute right-0 text-lg hidden md:block transition-all"
          onClick={scrollRight}
        >
          <IoIosArrowDropright />
        </button>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-purple-400 rounded-xl shadow">
                  <div className="bg-slate-100 h-48 p-2 min-w-[280px] md:min-w-[145px] rounded-xl justify-center items-center w-full animate-pulse">
                    {/* <img src={product.productImg[0]} className=' object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply justify-center items-center'/> */}
                  </div>

                  <div className="p-4 grid gap-2">
                    <h2 className=" font-semibold text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-100 rounded animate-pulse h-3"></h2>
                    <p className=" capitalize text-xs pt-0 text-green-900 bg-slate-100 rounded animate-pulse h-3"></p>

                    <div className=" flex text-xs">
                      <p className="text-red-800 font-semibold bg-slate-100 rounded animate-pulse h-3"></p>
                      <p className="text-slate-700 line-through bg-slate-100 rounded animate-pulse h-3"></p>
                    </div>

                    <div>
                      <p className=" font-medium text-xs md:text-xs text-ellipsis line-clamp-2 justify-center bg-slate-100 rounded animate-pulse h-5"></p>
                    </div>

                    <button className="bg-red-400 hover:bg-red-600 px-2 rounded-full py-0.5 text-sm text-white font-semibold animate-pulse h-4"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-[#0D9276] rounded-2xl shadow p-2"
                >
                  <div className="bg-[#ffff] h-48 p-2 min-w-[280px] md:min-w-[145px] rounded-xl justify-center items-center w-full ">
                    <img
                      src={product.productImg[0]}
                      className=" object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply justify-center items-center mx-auto"
                    />
                  </div>

                  <div className="p-4 grid text-center justify-center mx-auto items-center">
                    <h2 className=" font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-white">
                      {product?.productName}
                    </h2>
                    <p className=" capitalize text-xs pt-0 text-white">
                      {product?.category}
                    </p>

                    <div className=" flex gap-2 text-sm mx-auto">
                      <p className="text-slate-200 font-bold text-md">
                        {displayLKR(product?.sellingPrice)}(1kg)
                      </p>
                      <p className="text-slate-300 line-through">
                        {displayLKR(product?.price)}
                      </p>
                    </div>

                    <div className="pb-2">
                      <p className=" font-semibold text-2xl md:text-sm text-ellipsis line-clamp-1 bg-[#DDF2FF] rounded px-2 mb-1 w-fit my-1 mx-auto">
                        {" "}
                        Available Qty: {displayKg(product?.productQuantity)}
                      </p>
                    </div>

                    {/* <div className="pb-0.5">
                      <p className=" font-medium text-xs md:text-xs text-ellipsis line-clamp-2 justify-center">
                        {product?.description}
                      </p>
                    </div> */}

                    <button
                      className="bg-red-400 hover:bg-red-600 px-2 rounded-full py-2 text-sm text-white font-semibold"
                      onClick={(e) => handelAddToCart(e, product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VertialCardProduct;

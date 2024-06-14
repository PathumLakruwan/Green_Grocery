import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayLKR from "../helpers/displayCurrency";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";
import displayKg from "../helpers/displayQuantity";

const HorizontalCardProduct = ({ category, heading }) => {
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
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-purple-400 rounded-xl shadow flex">
                  <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] rounded-xl w-5 animate-pulse">
                    {/* <img src={product.productImg[0]} className=' object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/> */}
                  </div>

                  <div className="p-4 grid gap-3 w-full">
                    <h2 className=" font-semibold text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-100 animate-pulse">
                      {product?.productName}
                    </h2>
                    <p className=" capitalize text-xs pt-0 text-green-900 p-2 bg-slate-100 animate-pulse"></p>

                    <div className=" flex gap-1 text-xs w-full">
                      <p className="text-red-800 font-semibold p-2 bg-slate-100 w-full animate-pulse"></p>
                      <p className="text-slate-700 line-through p-2 bg-slate-100 w-full animate-pulse"></p>
                    </div>

                    {/* <div>
                                    <p className=' font-medium text-xs md:text-xs text-ellipsis line-clamp-1'>{product?.description}</p>
                                </div> */}

                    <button className="bg-red-400 hover:bg-red-600 px-2 rounded-full py-0.5 text-sm text-white font-semibold w-full animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-[#0D9276] rounded-3xl shadow flex"
                >
                  <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] rounded-xl w-5">
                    <img
                      src={product.productImg[0]}
                      className=" object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    />
                  </div>

                  <div className="p-2 py-4 grid">
                    <h2 className=" font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-white">
                      {product?.productName}
                    </h2>
                    <p className=" capitalize text-xs pt-0 pb-0.5 font-semibold text-white">
                      {product?.category}
                    </p>

                    <div className=" flex gap-1 text-xs overflow-hidden ">
                      <p className="text-slate-200 font-bold text-md ">
                        {displayLKR(product?.sellingPrice)}(1kg)
                      </p>
                      <p className="text-slate-300 line-through">
                        {displayLKR(product?.price)}
                      </p>
                    </div>

                    <div>
                      <p className=" font-medium text-xs md:text-xs text-ellipsis line-clamp-1 bg-[#DDF2FF] rounded px-3 border-white mb-1 w-fit">
                        {" "}
                        Available Qty: {displayKg(product?.productQuantity)}
                      </p>
                    </div>

                    <button
                      className="bg-red-400 hover:bg-red-600 px-2 rounded-full py-0.5 text-sm text-white font-semibold"
                      onClick={(e) => handelAddToCart(e, product?._id)}
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

export default HorizontalCardProduct;

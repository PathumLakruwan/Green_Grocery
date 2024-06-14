import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayLKR from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollToTop from "../helpers/scrollToTop";

const RecomandedProductView = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //to before loading display purposes
  const loadingList = new Array(15).fill(null);

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

  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-2 overflow-hidden scroll-auto my-4" >
      {" "}
      {/**-scroll scrollbar-none */}
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
                to={"/home/product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-[#0D9276] rounded-xl shadow p-2"
                onClick={scrollToTop}
              >
                <h1 className="pb-1 font-semibold text-white"> People also Search...</h1>
                <div className="bg-slate-100 h-48 p-2 min-w-[280px] md:min-w-[145px] rounded-xl justify-center items-center w-full ">
                  <img
                    src={product.productImg[0]}
                    className=" object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply justify-center items-center mx-auto"
                  />
                </div>

                <div className="p-4 grid mx-auto items-center text-center justify-center">
                  <h2 className=" font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-white">
                    {product?.productName}
                  </h2>
                  <p className=" capitalize text-xs pt-0 text-white">
                    {product?.category}
                  </p>

                  <div className=" flex gap-2 text-md text-center justify-center">
                    <p className="text-white font-bold">
                      {displayLKR(product?.sellingPrice)}(1kg)
                    </p>
                    <p className="text-slate-300 line-through">
                      {displayLKR(product?.price)}
                    </p>
                  </div>

                  <div className="py-1">
                    <p className=" font-medium text-xs md:text-xs text-ellipsis line-clamp-3 justify-center text-white">
                      {product?.description}
                    </p>
                  </div>

                  <button
                    className="bg-red-400 hover:bg-red-600 px-2 rounded-full py-0.5 text-sm text-white font-semibold pt-2"
                    onClick={(e) => handelAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default RecomandedProductView;

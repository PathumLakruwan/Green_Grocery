import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayLKR from "../helpers/displayCurrency";
import RecomandedProductView from "../components/RecomandedProductView";
import displayKg from "../helpers/displayQuantity";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    category: "",
    productImg: [],
    description: "",
    productQuantity: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImgListLoading = new Array(1).fill(null);
  const [activeImg, setActiveImg] = useState();

  console.log("product id", params);

  // Fetch the Product Details
  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    setLoading(false);
    const dataResponse = await response.json();

    setData(dataResponse?.data);
    setActiveImg(dataResponse?.data?.productImg[0]);
  };
  console.log("datafffffffffff", data);

  const { fetchUserAddToCart } = useContext(Context);

  const handelAddToCart = async (e, product) => {
    await addToCart(e, product._id);
    fetchUserAddToCart();
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseInterProduct = (imgURL) => {
    //dataResponse?.data?.productImg[0] = imgURL
    setActiveImg(imgURL);
  };

  return (
    <div className=" container mx-auto p-4 ">
      <div className="bg-[#006A71] min-h-[280px] flex flex-col lg:flex-row gap-4 p-4 rounded-2xl">
        {/* Product Img */}
        <div className="h-96 flex flex-col lg:flex-row gap-2">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-100 rounded-xl relative">
            <img
              src={activeImg}
              alt=""
              className=" h-full w-full object-scale-down mix-blend-multiply p-2 rounded-xl"
            />
          </div>

          <div className="p-2 h-96">
            {loading ? (
              <div className=" gap-2 flex lg:flex-col overflow-auto h-full mx-auto">
                {productImgListLoading.map((el, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-white rounded animate-pulse p-2"
                      key={"loadingImg"}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className=" gap-2 flex lg:flex-col overflow-auto h-full mx-auto">
                {data?.productImg?.map((imgURL, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-100 rounded overflow-hidden mx-auto"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        alt=""
                        className=" w-full object-scale-down mix-blend-multiply p-1"
                        onMouseEnter={() => handleMouseInterProduct(imgURL)}
                        onClick={() => handleMouseInterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/*  Product Details*/}
        {loading ? (
          <div className=" flex flex-col gap-2 w-full">
            <h1 className="text-2xl font-semibold lg:text-4xl text-white px-5 bg-slate-100 animate-pulse w-full h-6 rounded"></h1>
            <p className=" rounded text-white px-2 capitalize bg-slate-700 inline-block  animate-pulse w-full h-8"></p>

            <div className="flex p-2 text-red-500 items-center gap-2  bg-slate-100 animate-pulse w-full h-6 rounded"></div>

            <div className="flex items-center gap-3 text-1xl font-medium">
              <p className="text-red-500  bg-slate-100 animate-pulse w-full h-6 rounded"></p>
              <p className="text-slate-300 line-through  bg-slate-100 animate-pulse w-full h-6 rounded"></p>
            </div>

            <div className="flex items-center gap-4 my-2">
              <button className=" border-2 rounded px-3 py-1 min-w-[100px] font-semibold  text-black hover:bg-red-500  bg-slate-100 animate-pulse w-full h-6"></button>
              <button className=" border-2 rounded px-3 py-1 min-w-[100px] text-white font-semibold hover:bg-white hover:text-black  bg-slate-100 animate-pulse w-full h-6 "></button>
            </div>

            <div>
              <p className="text-white font-medium my-1  bg-slate-100 animate-pulse w-full h-6 rounded"></p>
              <p className="text-slate-300 capitalize  bg-slate-100 animate-pulse w-full h-40 rounded"></p>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-2">
            <h1 className="text-2xl font-semibold lg:text-4xl text-white">
              {data?.productName}
            </h1>
            <p className=" rounded text-white px-2 capitalize bg-slate-400 inline-block w-fit">
              {data.category}
            </p>

            <div className="flex p-2 text-red-100 items-center gap-2">
              <FaStar /> <FaStar /> <FaStar /> <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-3 text-1xl font-medium">
              <p className="text-white font-semibold text-xl">{displayLKR(data.sellingPrice)}</p>
              <p className="text-slate-300 line-through">
                {displayLKR(data.price)}
              </p>
            </div>

            <div>
              <p className=" font-medium text-xl md:text-xs text-ellipsis line-clamp-1 bg-green-500 rounded px-2 mb-1 w-fit my-1">
                {" "}
                Available Qty: {displayKg(data?.productQuantity)}
              </p>
            </div>

            <div className="flex items-center gap-4 my-2">
              <button className=" border-2 rounded px-3 py-1 min-w-[100px] font-semibold bg-white text-black hover:bg-red-500 ">
                Buy
              </button>
              <button
                className=" border-2 rounded px-3 py-1 min-w-[100px] text-white font-semibold bg-red-500 hover:bg-white hover:text-black"
                onClick={(e) => handelAddToCart(e, data)}
              >
                Add to Cart
              </button>
            </div>

            <div>
              <p className="text-white font-medium my-1">Description: </p>
              <p className="text-slate-300 capitalize">{data.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <RecomandedProductView
          category={data?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
};

export default ProductDetails;

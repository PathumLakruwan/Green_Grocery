import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayLKR from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import displayKg from "../helpers/displayQuantity";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);
  const [currentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
  });
  const [userReceipts, setUserReceipts] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    setLoading(false);
    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateQty = async (ID, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartQty.url, {
        method: SummaryApi.updateCartQty.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productID: ID,
          quantity: qty,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        context.fetchUserAddToCart();
        fetchData();
      } else {
        console.error(
          "Failed to update product quantity:",
          responseData.message
        );
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  const deleteProduct = async (productID) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productID }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
      } else {
        console.error(
          "Failed to delete product from cart:",
          responseData.message
        );
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setCurrentDateTime({ date, time });
    };

    updateDateTime(); // Initial call to set the date and time

    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await fetch(SummaryApi.checkout.url, {
        method: SummaryApi.checkout.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Checkout successful!");
        setData([]); // Clear the cart
        context.fetchUserAddToCart();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("An error occurred during checkout. Please try again.");
    }
  };

  const fetchUserReceipts = async () => {
    try {
      const response = await fetch(SummaryApi.userReceipt.url, {
        method: SummaryApi.userReceipt.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setUserReceipts(dataResponse?.data || []);
    } catch (err) {
      //setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReceipts();
  }, []);

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr?.quantity * curr?.productID?.sellingPrice,
    0
  );

  const handleChangeQty = async (ID, qty) => {
    try {
      const newQty = Number(qty);
      if (newQty < 1) {
        console.error("Quantity cannot be less than 1");
        return;
      }
      updateQty(ID, newQty);
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  return (
    <div className="container mx-auto w-[95%]">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-slate-300 py-5">No Data Here</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:justify-between p-4">
        {/* View Product */}
        <div className="w-full max-w-3xl ">
          {loading
            ? loadingCart.map((el, index) => (
                <div
                  key={el + "Add To Cart Loading" + index}
                  className="w-full mx-auto bg-slate-200 h-36 my-2 border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map((product) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full mx-auto bg-slate-100 h-36 my-2 border-slate-300 rounded grid grid-cols-[150px,1fr]"
                  >
                    <div className="w-36 h-36 bg-slate-300 rounded">
                      <img
                        src={product?.productID?.productImg[0]}
                        alt=""
                        className="w-full h-full rounded object-scale-down mix-blend-multiply"
                      />
                    </div>

                    <div className="p-2 relative">
                      {/* Delete Product */}
                      <div
                        className="absolute right-0 p-2 hover:bg-red-600 hover:text-white rounded-full"
                        onClick={() => deleteProduct(product?.productID?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h1 className="text-lg lg:text-xl text-ellipsis line-clamp-1 ">
                        {product?.productID?.productName}
                      </h1>
                      <h1 className="text-md lg:text-md text-ellipsis line-clamp-1 text-green-500 capitalize ">
                        {product?.productID?.category}
                      </h1>

                      <div className="flex items-center gap-2 justify-between">
                        <p className="font-semibold text-red-400">
                          {displayLKR(product?.productID?.sellingPrice)}
                        </p>
                        {/* <p className='font-semibold text-red-400 line-through'>{displayLKR(product?.productID?.price)}</p> */}
                        <p className="font-semibold text-slate-400">
                          {displayLKR(
                            product?.productID?.sellingPrice * product.quantity
                          )}
                        </p>
                      </div>

                      <div>
                        <p className=" font-medium text-xl md:text-xs text-ellipsis line-clamp-1 bg-green-500 rounded px-2 mb-1 w-fit my-1">
                          {" "}
                          Available Qty:{" "}
                          {displayKg(product?.productID?.productQuantity)}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <label> Quantity</label>
                        <input
                          type="number"
                          min={1}
                          value={product.quantity}
                          onChange={(e) =>
                            handleChangeQty(
                              product.productID._id,
                              e.target.value
                            )
                          }
                          className="w-12 h-full bg-white rounded text-center"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Total Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm ">
          <div className="mb-4">
            {/* Table Header */}
            <div className="flex justify-between mb-4 bg-slate-200 rounded p-3">
              <div className="rounded-lg text-center align-middle">
                <h2 className="text-xl font-semibold">Invoice</h2>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Date: {currentDateTime.date}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Time: {currentDateTime.time}
                </p>
              </div>
            </div>

            {/* Product Details */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              data.map((product) => (
                <div key={product?._id} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-lg font-medium">
                      {product?.productID?.productName}
                    </h3>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">
                      {product?.quantity} x{" "}
                      {displayLKR(product?.productID?.sellingPrice)}
                    </p>
                    <p className="font-semibold">
                      {displayLKR(
                        product?.quantity * product?.productID?.sellingPrice
                      )}
                    </p>
                  </div>
                  <hr className="my-2 border-gray-300" />
                </div>
              ))
            )}

            {/* Summary */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-lg">Number of Items In cart</p>
                <p className="font-bold">{data.length}</p>
              </div>

              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-lg">Total Price</p>
                <p className="font-bold">{displayLKR(totalPrice)}</p>
              </div>

              {/* <div className='flex items-center justify-between mb-2'>
                            <p className='font-semibold'>Discount (8%)</p>
                            <p>{displayLKR(totalPrice * 0.08)}</p>
                        </div>

                        <div className='flex items-center justify-between mb-2'>
                            <p className='font-semibold text-lg'>Total</p>
                            <p className='text-lg font-semibold'>{displayLKR(totalPrice-(totalPrice * 0.08))}</p>
                </div> */}
            </div>

            {/* Checkout Button */}
            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-slate-500 py-2 px-4 flex justify-between items-center rounded-md">
          <h1 className="font-semibold text-white text-center text-xl">
            {" "}
            Your Orders{" "}
          </h1>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="py-4 flex flex-wrap gap-4">
            {userReceipts.map((receipt) => (
              <div
                key={receipt._id}
                className="bg-slate-200 shadow-md p-4 rounded mb-4"
              >
                <div className="justify-between mb-2 p-1">
                  <h3 className="text-lg font-medium">
                    Receipt ID: {receipt.receiptId}
                  </h3>
                  <p className="font-semibold">
                    Date: {new Date(receipt.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="border-t border-gray-800 my-2"></div>

                <div className="max-h-96 overflow-auto scrollbar-none">
                  {receipt.products.map((product, index) => (
                    <div key={product.productID._id} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <h3 className="text-lg font-medium">
                          {product.productID.productName}
                        </h3>
                      </div>

                      <div className="flex justify-between">
                        <p className="text-sm text-gray-900">
                          {product.quantity} x{" "}
                          {displayLKR(product.productID.sellingPrice)}
                        </p>
                        <p className="font-semibold">
                          {displayLKR(
                            product.quantity * product.productID.sellingPrice
                          )}
                        </p>
                      </div>

                      <hr className="my-2 border-gray-300" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <p className="font-semibold">
                    Total Amount: {displayLKR(receipt.totalAmount.toFixed(2))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

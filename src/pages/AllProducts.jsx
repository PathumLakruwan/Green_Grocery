import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

export default function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.getProduct.url, {
      method: "get",
    });

    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  const deleteProduct = async(_id)=>{
    try {
      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        toast.success("Receipt deleted successfully");
        setAllProduct(); // Refresh the products list after deletion
      } else {
        throw new Error(dataResponse.message);
      }
      
    } catch (error) {
      toast.error(`Failed to delete receipt: ${err.message}`);
    }
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="m-8">
      <div className=" bg-slate-500 py-2 px-4 flex justify-between items-center">
        <h1 className=" font-semibold text-3xl text-white text-center">
          {" "}
          All Products{" "}
        </h1>
        <button
          className=" rounded-full py-1 px-3 border-2 bg-blue-500 font-semibold hover:bg-blue-700 text-white"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Products
        </button>
      </div>

      {/* All Products */}
      {/* overflow-auto h-[calc(100vh-190px)] */}
      <div className=" flex items-center gap-4 py-4 flex-wrap ">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchData={fetchAllProduct}
            />
          );
        })}
      </div>

      {
        //uploadProduct
        openUploadProduct && (
          <UploadProduct
            onClose={() => setOpenUploadProduct(false)}
            fetchData={fetchAllProduct}
          />
        )
      }
    </div>
  );
}

import React, { useState } from "react";
import { FaEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayLKR from "../helpers/displayCurrency";
import displayKg from "../helpers/displayQuantity";


const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  

  return (
    <div className="bg-purple-300 p-2 rounded m-2">
      <div className="w-40 ">
        <div className=" w-32 h-32 flex items-center justify-center">
          <img
            src={data?.productImg[0]}
            className="object-fill mx-auto h-full"
          />
        </div>
        <p className=" font-semibold text-ellipsis line-clamp-2">
          {data.productName}
        </p>

        <div>
          <div>{displayLKR(data.sellingPrice)}</div>

          <p className="font-semibold text-ellipsis line-clamp-2 text-sm">
            Remaining :{displayKg(data.productQuantity)}
          </p>

          <div className=" flex">
          <div
            className="w-fit ml-auto p-2 bg-green-100 rounded-full hover:bg-green-400 cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <FaEdit />
          </div>
          {/* <div
            className="w-fit ml-auto p-2 bg-green-100 rounded-full hover:bg-green-400 cursor-pointer"
            onClick={() => setDeleteProduct(true)}
          >
            <MdDelete />
          </div> */}
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}

    </div>
  );
};

export default AdminProductCard;

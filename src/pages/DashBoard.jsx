import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import displayLKR from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function AllReceipts() {
  const [allReceipts, setAllReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all receipts from the backend
  const fetchAllReceipts = async () => {
    try {
      const response = await fetch(SummaryApi.getReceiptsByOrderID.url, {
        method: SummaryApi.getReceiptsByOrderID.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setAllReceipts(dataResponse?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a receipt by ID
  const deleteReceipt = async (receiptId) => {
    try {
      const response = await fetch(SummaryApi.deleteReceipt.url, {
        method: SummaryApi.deleteReceipt.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiptId }),
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        toast.success("Receipt deleted successfully");
        fetchAllReceipts(); // Refresh the receipts list after deletion
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      toast.error(`Failed to delete receipt: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchAllReceipts();
  }, []);

  return (
    <div>
      <div className="bg-slate-400 py-2 px-4 flex justify-between items-center">
        <h1 className="font-semibold text-white text-center text-xl">
          All Receipts
        </h1>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="py-4 flex flex-wrap gap-4">
          {allReceipts.map((receipt) => (
            <div
              key={receipt._id}
              className="bg-slate-200 shadow-md p-4 rounded mb-4"
            >
              <div className="justify-between mb-2 p-1">
                <h3 className="text-lg font-medium ">
                  Receipt ID: {receipt.receiptId}
                </h3>
                <p className="font-semibold">
                  Date: {new Date(receipt.createdAt).toLocaleString()}
                </p>
                <p className="font-semibold">User ID {receipt.userID}</p>
              </div>

              <div className="border-t border-gray-800 my-2"></div>

              <div className="max-h-96 overflow-auto">
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
                        {product.quantity * product.productID.sellingPrice}
                      </p>
                    </div>

                    <hr className="my-2 border-gray-300" />
                  </div>
                ))}

                <div className="flex justify-end">
                  <p className="font-semibold">
                    Total Amount:{displayLKR(receipt.totalAmount.toFixed(2))}
                  </p>
                </div>

                <div className="flex justify-center mt-4 bg-white rounded text-2xl ">
                  <div
                    className="p-2 hover:bg-red-600 hover:text-white rounded-full cursor-pointer"
                    onClick={() => deleteReceipt(receipt.receiptId)}>
                    <MdDelete />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

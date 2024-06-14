import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import displayLKR from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function UserReceipts() {
  const [userReceipts, setUserReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user receipts from the backend
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReceipts();
  }, []);

  return (
    <div>
      <div className="bg-slate-600 py-2 px-4 flex justify-between items-center">
        <h1 className="font-semibold text-white text-center text-xl">
          Your Receipts
        </h1>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="py-4 flex flex-wrap gap-4">
          {userReceipts.map((receipt) => (
            <div
              key={receipt._id}
              className="bg-slate-400 shadow-md p-4 rounded mb-4"
            >
              <div className="justify-between mb-2 p-1">
                <h3 className="text-lg font-medium">
                  Receipt ID: {receipt.receiptId}
                </h3>
                <p className="font-semibold">
                  Date: {new Date(receipt.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="border-t border-gray-300 my-2"></div>

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
  );
}

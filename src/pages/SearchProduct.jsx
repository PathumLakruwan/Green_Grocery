import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SummaryApi from "../common";
import SearchProductCard from "../components/SearchProductCard";

const SearchProduct = () => {
  const query = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("query", query.search);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search, {
      method: SummaryApi.searchProduct.method,
    });
    const dataResponse = await response.json();

    setLoading(false);
    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className=" container mx-auto p-4">
      {loading && <p className=" text-center text-xl"> Loading .....</p>}
      <p className="my-2 font-semibold">
        Number of Matching Results: {data.length}
      </p>

      {data.length == 0 && !loading && (
        <p className="bg-white p-4 text-center"> No Data Found ! </p>
      )}

      {data.length !== 0 && !loading && (
        <SearchProductCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;

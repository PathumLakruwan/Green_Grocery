import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import SummaryApi from "../common";
import displayLKR from "../helpers/displayCurrency";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Report = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getReports.url, {
        method: SummaryApi.getReports.method,
        credentials: "include",
      });
      const result = await response.json();
      console.log("Report", result);
      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching report data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (!data) return <p className="text-center text-xl">No data available</p>;

  const colors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
  ];

  // Sales by Category for bar chart
  const barData = {
    labels: Object.keys(data.salesByCategory),
    datasets: [
      {
        label: "Sales by Category",
        data: Object.values(data.salesByCategory),
        backgroundColor: colors.slice(
          0,
          Object.keys(data.salesByCategory).length
        ),
      },
    ],
  };

  // Percentage of Total Sales by Product for pie chart
  const totalQuantities = Object.values(data.salesByProduct).reduce(
    (a, b) => a + b,
    0
  );
  const pieData = {
    labels: Object.keys(data.salesByProduct),
    datasets: [
      {
        data: Object.values(data.salesByProduct).map(
          (qty) => (qty / totalQuantities) * 100
        ),
        backgroundColor: colors.slice(
          0,
          Object.keys(data.salesByProduct).length
        ),
      },
    ],
  };

  // Table data
  const tableData = Object.entries(data.salesByCategory).map(
    ([category, quantity], index) => ({
      category,
      quantity,
      totalSales: ((quantity * data.totalSales) / totalQuantities).toFixed(2), // Approximate total sales for each category
      color: colors[index % colors.length],
    })
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-left text-4xl font-semibold mb-4">Sales Report</h1>

      <div className="flex col-span-3 justify-center gap-36 bg-slate-300 rounded items-center">
        <p className="text-center text-lg font-semibold py-4">
          Total Sales: {displayLKR(data.totalSales)}
        </p>
        <p className="text-center text-lg font-semibold py-4">
          Number of Orders: {data.numberOfOrders}
        </p>
        <p className="text-center text-lg font-semibold py-4">
          Average Order Value: {displayLKR(data.averageOrderValue)}
        </p>
      </div>

      <div className="flex justify-center gap-12 items-center bg-slate-300 m-8 p-12 rounded">
        <div className="w-full md:w-1/2 my-4">
          <h2 className="text-center text-xl font-semibold mb-4">
            Sales by Category
          </h2>
          <Bar data={barData} />
        </div>

        <div className="w-full md:w-1/2 my-4">
          <h2 className="text-center text-xl font-semibold mb-4">
            Percentage of Total Sales by Product
          </h2>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-center text-xl font-semibold mb-4">
          Sales Report Table
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 items-center">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                  Quantity Sold
                </th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                  Total Sales
                </th>
              </tr>
            </thead>
            <tbody className="items-center text-center">
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={`bg-white ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {row.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.totalSales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;

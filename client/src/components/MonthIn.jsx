import React, { useEffect, useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";

const InCharts = () => {
  const { user } = useAuthContext();
  const { products, dispatch } = useProductsContext();

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_PRODUCTS", payload: json });
    }
  };

  const [selectedDate, setSelectedDate] = useState(""); // State for the selected date

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const productSumIn = products?.map((product) => ({
    name: product.name,
    sumIn: product.in.reduce(
      (acc, item) => acc + parseInt(item.split("@")[0]),
      0
    ),
    initQty: product.initQty,
    currQty: product.currQty,
    ins: product.in,

    date: Array.from(
      new Set(
        product.in.map((item) => {
          const date = new Date(item.split("@")[1]);
          return format(date, "yyyy-MM");
        })
      )
    ),
  }));

  const uniqueDates = Array.from(
    new Set(productSumIn?.flatMap((product) => product.date))
  );

  // Filter the productSumIn based on the selected date
  const filteredProductSumIn = productSumIn?.filter((product) =>
    product.date.includes(selectedDate)
  );

  const arrays = products !== null ? Array.from(products, (p) => p.in) : [];

  // Check if products is null and refetch products
  if (products === null) {
    fetchProducts();
  }

  const filteredArrays = arrays.map((array) =>
    array?.filter((item) => item?.includes(selectedDate))
  );
  const sums = filteredArrays
    .map((array) =>
      array?.reduce((sum, item) => sum + parseInt(item?.split("@")[0]), 0)
    )
    .filter((sum) => sum !== 0);


  useEffect(() => {
    if (user || selectedDate) {
      fetchProducts();
    }
  }, [dispatch, user, selectedDate]);

  return (
    <>
      <select
        value={selectedDate}
        onChange={handleDateChange}
        className="block mt-4 mb-6 px-4 py-2 rounded-md bg-gray-700 text-white"
      >
        <option value="">Select A Month</option>
        {uniqueDates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>

      <table className="min-w-full bg-gray-800 text-white text-left ">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-l border-t w-5/12">
              Name
            </th>
            <th className="px-4 py-2 border-b border-l border-t w-1/12">
              Available
            </th>
            <th className="px-4 py-2 border-b border-l border-t w-1/12">IN</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductSumIn?.map((product, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b border-l">{product.name}</td>
              <td className="px-4 py-2 border-b border-l">{product.currQty}</td>
              <td className="px-4 py-2 border-b border-l">
                {sums[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InCharts;

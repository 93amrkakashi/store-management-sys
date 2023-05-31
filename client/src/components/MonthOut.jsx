import React, { useEffect, useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";

const MonthOut = () => {
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

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const productSumOut = products?.map((product) => ({
    name: product.name,
    sumOut: product.out.reduce(
      (acc, item) => acc + parseInt(item.split("@")[0]),
      0
    ),
    initQty: product.initQty,
    currQty: product.currQty,
    outs: product.out,

    date: Array.from(
      new Set(
        product.out.map((item) => {
          const date = new Date(item.split("@")[1]);
          return format(date, "yyyy-MM");
        })
      )
    ),
  }));

  const uniqueDates = Array.from(
    new Set(productSumOut?.flatMap((product) => product.date))
  );

  const filteredProductSumOut = productSumOut?.filter((product) =>
    product.date.includes(selectedDate)
  );

  const arrays = products !== null ? Array.from(products, (p) => p.out) : [];

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
      <select value={selectedDate} onChange={handleDateChange}>
        <option value="">Select A Month</option>
        {uniqueDates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>

      <table className="border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-l border-t w-5/12">
              Name
            </th>
            <th className="px-4 py-2 border-b border-l border-t w-1/12">
              Available
            </th>
            <th className="px-4 py-2 border-b border-l border-t w-1/12">OUT</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductSumOut?.map((product, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b border-l">{product.name}</td>
              <td className="px-4 py-2 border-b border-l">{product.currQty}</td>
              <td className="px-4 py-2 border-b border-l">{sums[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MonthOut
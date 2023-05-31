import React, { useEffect, useState } from "react";
import OutChart from "./OutChart";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";

const MainCharts = () => {
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

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [dispatch, user]);

  const [selectedDate, setSelectedDate] = useState(""); // State for the selected date

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

  // Filter the productSumOut based on the selected date
  const filteredProductSumOut = productSumOut?.filter((product) =>
    product.date.includes(selectedDate)
  );
  console.log(filteredProductSumOut);
  return (
    <div className="min-w-full h-full overflow-y-scroll p-3">
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
    <td className="px-4 py-2 border-b border-l">
      {selectedDate
        ? product.out
            ?.filter((item) => {
              const date = new Date(item.split("@")[1]);
              return date === selectedDate;
            })
            .reduce(
              (acc, item) => acc + parseInt(item.split("@")[0]),
              0
            )
        : product.date.map((date, index) => (
            <div key={index}>{`${date}: ${product.sumOut}`}</div>
          ))}
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default MainCharts;

import React, { useEffect, useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";
import OutChart from "./OutChart";
import { useFetchProducts } from "../hooks/fetchProducts";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const MonthOut = () => {
  const { user } = useAuthContext();
  const { products } = useProductsContext();
  const [dataOut, setoutData] = useState(null);

  useFetchProducts(user);

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
    new Set(
      productSumOut
        ?.flatMap((product) =>
          product.outs.map((item) => item.split("@")[1].slice(0, 7))
        )
        .filter((date) => date !== undefined)
    )
  );
  const filteredProductSumOut = productSumOut?.filter((product) =>
    product.date.includes(selectedDate)
  );

  const arrays = products !== null ? Array.from(products, (p) => p.out) : [];

  const filteredArrays = arrays.map((array) =>
    array?.filter((item) => item?.includes(selectedDate))
  );
  const sums = filteredArrays
    .map((array) =>
      array?.reduce((sum, item) => sum + parseInt(item?.split("@")[0]), 0)
    )
    .filter((sum) => sum !== 0);

  useEffect(() => {
    const data = products?.map((product) => {
      const sumOut = product.out.reduce((total, item) => {
        const outValue = item.split("@")[0];
        return total + parseInt(outValue, 10);
      }, 0);
      return { name: product.name, out: sumOut };
    });
    setoutData(data);
  }, [selectedDate]);
console.log(filteredProductSumOut);
  return (
    <>
      <select
        value={selectedDate}
        onChange={handleDateChange}
        className="mx-auto block mt-4 mb-6 px-4 font-bold py-2 rounded-md bg-gray-900 text-white"
      >
        <option value="">Select A Month</option>
        {uniqueDates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
      {selectedDate && <>
      <table className="min-w-full bg-gray-800 text-white text-left ">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-l border-t w-5/12	">
              Name
            </th>
            <th className="text-center px-4 py-2 border-b border-l border-t w-1/12">
              Available
            </th>
            <th className="text-center px-4 py-2 border-b border-l border-t border-r w-1/12">OUT</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductSumOut?.map((product, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b border-l">{product.name}</td>
              <td className="text-center px-4 py-2 border-b border-l">{product.currQty}</td>
              <td className="text-center px-4 py-2 border-b border-l border-r">{sums[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="charts flex flex-col gap-2 min-w-full mx-auto px-4 py-8 text-white">
        {/* {dataOut && <OutChart dataOut={dataOut} />} */}
        <div style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataOut}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey="out" />
              <Tooltip />
              <Legend />
              <Bar dataKey="out" fill="#1d4ed8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
      </div>
      </>}
    </>
  );
};

export default MonthOut;

import React, { useEffect, useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";
import { useFetchProducts } from "../hooks/fetchProducts";
import InChart from "./InChart";

const MonthIn = () => {
  const { user } = useAuthContext();
  const { products } = useProductsContext();
  const [inData, setinData] = useState(null);

  useFetchProducts(user);

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const productSumin = products?.map((product) => ({
    name: product.name,
    sumin: product.in.reduce(
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
    new Set(
      productSumin
        .flatMap((product) =>
          product.ins.map((item) => item.split("@")[1].slice(0, 7))
        )
        .filter((date) => date !== undefined)
    )
  );

  console.log(uniqueDates);

  const filteredProductSumin = productSumin?.filter((product) =>
    product.date.includes(selectedDate)
  );

  const arrays = products !== null ? Array.from(products, (p) => p.in) : [];

  const filteredArrays = arrays.map((array) =>
    array?.filter((item) => item?.includes(selectedDate))
  );
  const sums = filteredArrays
    .map((array) =>
      array?.reduce((sum, item) => sum + parseInt(item?.split("@")[0]), 0)
    )
    .filter((sum) => sum !== 0);

  useEffect(() => {
    const chartin = {
      labels: filteredProductSumin?.map((product) => product.name),
      datasets: [
        {
          label: "in",
          data: [...sums],
          backgroundColor: "red",
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
    setinData(chartin);
  }, [selectedDate]);

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
          {filteredProductSumin?.map((product, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b border-l">{product.name}</td>
              <td className="px-4 py-2 border-b border-l">{product.currQty}</td>
              <td className="px-4 py-2 border-b border-l">{sums[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="charts flex flex-col gap-2 min-w-full mx-auto px-4 py-8 text-white">
        {inData && <InChart inData={inData} />}
      </div>
    </>
  );
};

export default MonthIn;

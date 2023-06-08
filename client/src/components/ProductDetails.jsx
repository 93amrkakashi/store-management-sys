import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import ProductTable from "./ProductTable";
import { format } from "date-fns";
import { url } from "../const";
import {
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import InChart from "./InChart";
import OutChart from "./OutChart";
const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [product, setProduct] = useState(null);
  const [outData, setOutData] = useState(null);
  const [inData, setInData] = useState(null);

  const dataOut = product?.out?.map((item) => {
    const [value, date, creator] = item.split("@");
    const formattedDate = format(new Date(date), "dd-MM-yyyy");
    return { date: formattedDate, in: product.in[0].split("@")[0], OUT: value };
  });
  const dataIn = product?.in?.map((item) => {
    const [value, date, creator] = item.split("@");
    const formattedDate = format(new Date(date), "dd-MM-yyyy");
    return { date: formattedDate, IN: product.in[0].split("@")[0], OUT: value };
  });
  const fetchProduct = async () => {
    try {
      const response = await fetch(`${url}/products/${id}`);
      const productData = await response.json();
      setProduct(productData);
    
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const inChartKey = inData ? Math.random() : null;
  useEffect(() => {
    if (user) {
      fetchProduct();
    }
  }, [user]);

  if (!product) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="min-w-full h-full overflow-y-scroll p-3 flex flex-col gap-2">
      <div className="details min-w-full mx-auto px-4 py-8 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {product.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Description:</span> 
          {product.description}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Initial Quantity:</span> 
          {product.initQty}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Current Quantity:</span> 
          {product.currQty}
        </p>
      </div>
      <div className="charts flex flex-col gap-2 min-w-full mx-auto px-4 py-8 text-white w-full">
        {dataOut && <OutChart dataOut={dataOut} />} 
         {dataIn && <InChart key={inChartKey} dataIn={dataIn} />}
      </div>

      <div className="charts min-w-full mx-auto px-4 py-8">
        <ProductTable product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;

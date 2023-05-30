import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import OutChart from "./OutChart";
import InChart from "./InChart";
import ProductTable from "./ProductTable";
import { format } from "date-fns";


const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [product, setProduct] = useState(null);
  const [outData, setoutData] = useState(null);
  const [inData, setinData] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const productData = await response.json();
      setProduct(productData);

      // Prepare chart data based on product data
      const chartOut = {
        labels: [...productData?.outDate.map((date) => format(
          new Date(date),
          "dd/MM/yyyy"
        ))],
        datasets: [
          {
            label: "OUT",
            data: [...productData?.out],
            backgroundColor: "red",
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      };
      setoutData(chartOut);
      
      const chartIn = {
        // format(
        //   new Date(product.inDate[index]),
        //   "EEEE - dd/MM/yyyy - 'at' hh:mm a"
        // )
        labels: [...productData?.inDate.map((date) => format(
          new Date(date),
          "dd/MM/yyyy"
        ))],
        datasets: [
          {
            label: "IN",
            data: [...productData?.in],
            backgroundColor: "green",
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      };
      setinData(chartIn);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

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
          <span className="font-semibold">Description:</span>{" "}
          {product.description}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Initial Quantity:</span>{" "}
          {product.initQty}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Current Quantity:</span>{" "}
          {product.currQty}
        </p>
      </div>
      <div className="charts flex flex-col gap-2 min-w-full mx-auto px-4 py-8 text-white">
        {outData && <OutChart outData={outData} />}
        {inData && <InChart inData={inData} />}
      </div>
      <div className="charts  min-w-full mx-auto px-4 py-8 ">
      <ProductTable product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;
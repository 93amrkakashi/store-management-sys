import React from "react";
import { Bar } from "react-chartjs-2";

function OutChart({ outData }) {
  return (
    <>
      <Bar className="min-w-full bg-gray-200" data={outData} />;
    </>
  );
}

export default OutChart;

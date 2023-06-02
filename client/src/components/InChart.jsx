import React from "react";
import { Bar } from "react-chartjs-2";

function InChart({ inData }) {
  return (
    <>
      <Bar className="min-w-full bg-gray-200" data={inData} />;
    </>
  );
}

export default InChart;

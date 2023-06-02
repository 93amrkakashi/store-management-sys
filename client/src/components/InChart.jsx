import React from "react";
import { Bar } from "react-chartjs-2";

function InChart({ inData }) {
  const key = Math.random(); // Generate a unique key for the chart

  return (
    <div key={key}>
      <Bar className="min-w-full bg-gray-200" data={inData} />;
    </div>
  );
}

export default InChart;

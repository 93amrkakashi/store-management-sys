import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ userData }) {
  return <Bar className='min-w-full' data={userData} />;
}

export default BarChart
import React, { useState } from "react";
import MonthOut from "./MonthOut";
import MonthIn from "./MonthIn";

const MainCharts = () => {
  const [chartType, setChartType] = useState("out");

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div className="min-w-full h-full overflow-y-scroll p-3 bg-gray-800">
      <div className="flex justify-center items-center py-3 flex-col mx-auto space-x-4 mb-6 w-[40%] rounded-md bg-gray-900 border-gray-600 text-white">
        <h1 className="text-base font-bold text-xl">CHOOSE OPERATION</h1>
        <div className="flex justify-around items-center mx-auto space-x-4 m-3 w-[40%] rounded-md bg-gray-900 border-gray-600 text-white">
        <label className="flex items-center text-white ">
          <input
            type="radio"
            name="chartType"
            value="out"
            checked={chartType === "out"}
            onChange={handleChartTypeChange}
            className="m-2 w-6 h-6 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
          />
          <span className="text-base font-medium text-xl">Out</span>
        </label>
        <label className="flex items-center text-white">
          <input
            type="radio"
            name="chartType"
            value="in"
            checked={chartType === "in"}
            onChange={handleChartTypeChange}
            className="m-2 w-6 h-6 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
          />
          <span className="text-base font-medium text-xl">In</span>
        </label>
        </div>
      </div>

      {chartType === "out" && <MonthOut />}
      {chartType === "in" && <MonthIn />}
    </div>
  );
};

export default MainCharts;

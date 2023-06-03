import React, { useState } from "react";
import MonthOut from "./MonthOut";
import MonthIn from "./MonthIn";

const MainCharts = () => {
  const [chartType, setChartType] = useState("out");

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div className="min-w-full h-full overflow-y-scroll p-3 bg-gray-900">
      <div className="flex justify-center items-center mx-auto space-x-4 mb-6 w-[40%] rounded-md bg-gray-700 border-gray-600 text-white">
        <label className="flex items-center text-white">
          <input
            type="radio"
            name="chartType"
            value="out"
            checked={chartType === "out"}
            onChange={handleChartTypeChange}
            className="m-2 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
          />
          <span className="text-base font-medium">Out</span>
        </label>
        <label className="flex items-center text-white">
          <input
            type="radio"
            name="chartType"
            value="in"
            checked={chartType === "in"}
            onChange={handleChartTypeChange}
            className="m-2 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
          />
          <span className="text-base font-medium">In</span>
        </label>
      </div>

      {chartType === "out" && <MonthOut />}
      {chartType === "in" && <MonthIn />}
    </div>
  );
};

export default MainCharts;

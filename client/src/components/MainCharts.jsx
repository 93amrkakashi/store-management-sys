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
      <div className="flex justify-center space-x-4 mb-6">
        <label className="flex items-center text-white">
          <input
            type="radio"
            name="chartType"
            value="out"
            checked={chartType === "out"}
            onChange={handleChartTypeChange}
            className="mr-2 appearance-none bg-gray-800 border-2 border-gray-600 rounded-md p-2 focus:outline-none focus:border-blue-500"
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
            className="mr-2 appearance-none bg-gray-800 border-2 border-gray-600 rounded-md p-2 focus:outline-none focus:border-blue-500 color-red"
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

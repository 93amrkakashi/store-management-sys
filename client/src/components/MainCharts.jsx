import React, { useState } from "react";
import MonthOut from "./MonthOut";
import MonthIn from "./MonthIn";

const MainCharts = () => {
  const [chartType, setChartType] = useState("out");

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div className="min-w-full h-full overflow-y-scroll p-3">
      <div>
        <label>
          <input
            type="radio"
            name="chartType"
            value="out"
            checked={chartType === "out"}
            onChange={handleChartTypeChange}
          />
          Out
        </label>
        <label>
          <input
            type="radio"
            name="chartType"
            value="in"
            checked={chartType === "in"}
            onChange={handleChartTypeChange}
          />
          In
        </label>
      </div>

      {chartType === "out" && <MonthOut />}
      {chartType === "in" && <MonthIn />}
    </div>
  );
};

export default MainCharts;

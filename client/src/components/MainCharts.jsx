import React from "react";

const MainCharts = () => {
  const date = "20@2023-05-30T11:06:40.826Z@amr ali";

// Extracting "20"
const QTY = date.split("@")[0];
const updatetat = date.split("@")[1];
// Extracting "2023"
const year = updatetat.slice(0, 4);

// Extracting "2023-05"
const month = updatetat.slice(0, 7);

// Extracting "2023-05-30"
const day = updatetat.slice(0, 10);

// Extracting "amr ali"
const name = date.split("@")[2];

console.log('qty ',QTY); // Output: "20"
console.log('year',year); // Output: "2023"
console.log('month',month); // Output: "2023-05"
console.log("day",day); // Output: "2023-05-30"
console.log("name",name); // Output: "amr ali"
console.log(updatetat); // Output: "amr ali"

  return (
    <div className="min-w-full h-full overflow-y-scroll p-3">MainCharts</div>
  );
};

export default MainCharts;

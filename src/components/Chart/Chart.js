import React from "react";
import * as Recharts from "recharts";
// import { searchResults } from "../../containers/App";

const {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} = Recharts;

const Chart = () => {
  const TABLE_LIST_1 = [
    { x: 10, y: 180 },
    { x: 20, y: 200 },
    { x: 50, y: 380 },
    { x: 70, y: 50 },
    { x: 90, y: 200 },
    { x: 210, y: 50 }
  ];
  const TABLE_LIST_2 = [
    { x: 10, y: 600 },
    { x: 50, y: 1000 },
    { x: 60, y: 800 },
    { x: 65, y: 450 },
    { x: 80, y: 350 },
    { x: 90, y: 450 },
    { x: 110, y: 615 },
    { x: 140, y: 300 },
    { x: 240, y: 400 },
    { x: 320, y: 200 }
  ];

  return (
    <ScatterChart
      width={730}
      height={250}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={"x"} />
      <YAxis dataKey={"y"} />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Legend />
      <Scatter name="list1" data={TABLE_LIST_1} fill="red" />
      <Scatter name="list2" data={TABLE_LIST_2} fill="blue" />
    </ScatterChart>
  );
};

export default Chart;

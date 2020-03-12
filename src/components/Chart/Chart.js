import React, { useContext } from "react";
import * as Recharts from "recharts";
import { searchResults } from "../../containers/App";

const {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} = Recharts;

const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const UnitPriceNum = ({ UnitPrice }) => {
  if (isNaN(UnitPrice)) {
    return 0;
  } else if (UnitPrice > 0) {
    return UnitPrice;
  }
};

function Chart(props) {
  return (
    <BarChart
      width={1000}
      height={5000}
      margin={{ top: 100, right: 100, bottom: 100, left: 250 }}
      data={props.data}
      layout="vertical"
    >
      <CartesianGrid strokeDasharray="4 4" />
      <XAxis
        name="Price per Square Meter"
        dataKey={UnitPriceNum}
        type="number"
        domain={[0, "dataMax"]}
        allowDataOverflow={true}
      />
      <YAxis
        name="District"
        dataKey="DistrictName"
        tick={<CustomizedAxisTick />}
        interval="preserveStart"
        type="category"
        allowDuplicatedCategory="false"
      />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Legend />
      <Bar name="Price per Square Meter" dataKey="UnitPrice" fill="blue"></Bar>
    </BarChart>
  );
}

export default Chart;

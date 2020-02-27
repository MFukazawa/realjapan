import React, { useContext } from "react";
import * as Recharts from "recharts";
import { searchResults } from "../../containers/App";

const {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} = Recharts;

function Chart() {
  // const [chartData, setChartData] = useState([]);
  const { setData } = useContext(searchResults);
  console.log(searchResults);

  return (
    <ScatterChart
      width={730}
      height={250}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={"District"} />
      <YAxis dataKey={"UnitPrice"} />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Legend />
      <Scatter name="list1" data={searchResults} fill="red" />
    </ScatterChart>
  );
}

export default Chart;

import React, { useState, useEffect } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  LabelSeries,
} from "react-vis";

function BarChart(props) {
  const start = props.start;
  const end = props.end;
  const chartWidth = 700;
  const chartHeight = 300;
  const chartDomain = [0, 60];
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/graph_data.json")
      .then((response) => response.json())
      .then((e) => setData(e));
  }, [setData]);
  return (
    <XYPlot
      xType="ordinal"
      width={chartWidth}
      height={chartHeight}
      yDomain={chartDomain}
    >
      <XAxis />
      <YAxis />
      <VerticalBarSeries data={data} />
      <LabelSeries
        data={data.map((e) => {
          if (start.getHours() === e.x) e.y = start.getMinutes();
          else if (end.getHours() === e.x) e.y = end.getMinutes();
          else if (start.getHours() < e.x && end.getHours() > e.x)
            e.y = chartHeight;
          console.log(e.x, e.y, start.getHours(), start.getMinutes());
          return e;
        })}
        labelAnchorX="middle"
        labelAnchorY="text-after-edge"
      />
    </XYPlot>
  );
}
export default BarChart;

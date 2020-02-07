import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Chart from "./Chart";
import DonutChart from "./donut-chart";
import withStyles from "react-jss";
const App = () => {
  const data = [
    {
      type: "Unauthenticated",
      value: 4800
    },
    {
      type: "Authenticated",
      value: 420
    },
    {
      type: "Self Authenticated ",
      value: 3705
    }
  ];
  const title = "Authentication";
  var colors = ["#55B1F3", "#3A66BB", "#C4C4C4"];
  return (
    <div>
      <DonutChart
        data={data}
        outerRadius={90}
        innerRadius={60}
        title={title}
        colors={colors}
      />
    </div>
  );
};

export default App;

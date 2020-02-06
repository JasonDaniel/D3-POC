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
      newValue: 4800,
      oldValue: 1865
    },
    {
      type: "Authenticated",
      newValue: 420,
      oldValue: 8365
    },
    {
      type: "Self Authenticated ",
      newValue: 3705,
      oldValue: 865
    }
  ];
  const title = "Authentication";
  var colors = ["#55B1F3", "#3A66BB", "#C4C4C4"];
  return (
    <div>
      <DonutChart
        data={data}
        outerRadius={130}
        innerRadius={77}
        title={title}
        colors={colors}
      />
    </div>
  );
};

export default App;

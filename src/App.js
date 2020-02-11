import React from "react";
import "./App.css";
import Chart from "./Chart";
import DonutChart from "./donut-chart";
import withStyles from "react-jss";
import BulletChart from "./bullet-chart";

import { ResponsiveBullet } from "@nivo/bullet";

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
  const bulletData = [
    {
      ranges: [1400],
      measures: [870],
      markers: [1010]
    }
  ];
  var periodInfo = "Quarter";

  const title = "Authentication";
  var colors = ["#55B1F3", "#3A66BB", "#C4C4C4"];
  return <BulletChart data={bulletData} period={periodInfo} />;
};

export default App;

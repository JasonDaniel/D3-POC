import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Chart from "./Chart";
import Chart1 from "./Chart1";
import BrushedChart from "./brushChart";
import TryChart from "./tryChart";

const App = () => {
  const width = 1600;
  const height = 800;
  const height2 = 600;
  const margin1 = { top: 160, right: 20, bottom: 110, left: 40 };
  const margin2 = { top: 450, right: 20, bottom: 170, left: 40 };

  return (
    <div>
      <Chart1
        width={width}
        height={height}
        margin1={margin1}
        margin2={margin2}
        height2={height2}
      />
      {/* <TryChart /> */}
    </div>
  );
};

export default App;

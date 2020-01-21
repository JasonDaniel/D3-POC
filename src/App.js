import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Chart from "./Chart";
import BrushedChart from "./brushChart";
import TryChart from "./tryChart";

const App = () => {
  const width = 1600;
  const height = 800;
  const height2 = 600;
  const margin1 = { top: 160, right: 20, bottom: 110, left: 40 };
  const margin2 = { top: 450, right: 20, bottom: 170, left: 40 };
  const data = [
    {
      dimBranName: "Vogue",
      value: 400
    },
    {
      dimBranName: "Allure",
      value: 2420
    },
    {
      dimBranName: "Teen Vogue",
      value: 1270
    },
    {
      dimBranName: "CN Traveller",
      value: 553
    },
    {
      dimBranName: "Wired",
      value: 731
    },
    {
      dimBranName: "Bon Appetite",
      value: 136
    },
    {
      dimBranName: "Ars tech",
      value: 682
    },
    {
      dimBranName: "AD",
      value: 239
    },
    {
      dimBranName: "The New Yorker",
      value: 367
    },
    {
      dimBranName: "Vanity Fair",
      value: 442
    }
  ];

  return (
    <div>
      <Chart
        data={data}
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

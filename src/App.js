import React from "react";
import "./App.css";
import Chart from "./Chart";

const App = () => {
  const width = 1600;
  const height = 800;
  const height2 = 800;
  const margin1 = { top: 220, right: 20, bottom: 110, left: 40 };
  const margin2 = { top: 450, right: 20, bottom: 170, left: 40 };

  return (
    <div>
      <Chart
        width={width}
        height={height}
        margin1={margin1}
        margin2={margin2}
        height2={height2}
      />
    </div>
  );
};

export default App;

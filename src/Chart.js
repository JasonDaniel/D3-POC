import React, { useEffect, useRef } from "react";
import {
  select,
  extent,
  scaleLinear,
  scaleBand,
  axisBottom,
  axisLeft,
  max
} from "d3";
import "./App.css";

const Chart = () => {
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

  const barRef = useRef();

  const width = 1000;
  const height = 800;
  const margin = 50;
  const padding = 50;

  //Declaring the entrie code in use effect so that it will be triggered while the page is being loaded
  useEffect(() => {
    //referencing the svg where the chart is to be displayed
    const svg = select(barRef.current)
      .attr("width", width)
      .attr("height", height);

    //creacting a group variable
    var g = svg
      .append("g")
      .attr("transform", "translate("+50 + "," + 0 + ")");

    //creating xScale
    const xScale = scaleBand()
      .domain(data.map(d => d.dimBranName))
      .range([0, width - padding])
      .padding(0.2);

    //creating yScale
    const yScale = scaleLinear()
      .domain([0, max(data.map(d => d.value))])
      .range([height - margin, margin]);

    //appending xAxis
    g.append("g")
      .attr("transform", "translate(0," + (height - margin) + ")")
      .call(axisBottom(xScale))
      .call(g => g.select(".domain").remove())
      .selectAll("text")
      .attr("transform","rotate(-65)")
      .attr("dx")
     

    //appending yAxis
    g.append("g")
      .call(
        axisLeft(yScale)
          .tickFormat(d => {
            return d + "M";
          })
          .ticks(4)
          .tickSizeInner(-width)
      )
      .call(g => g.select(".domain").remove())
      .attr("class", "yAxis");

    //Adding the rectangle for bar graphs
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.dimBranName))
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(0) - yScale(d.value));
  }, [data]);

  return (
    <svg width="100%" height="100%" ref={barRef}>
      {" "}
    </svg>
  );
};

export default Chart;

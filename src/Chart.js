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
      country: "Vogue",
      value: 400
    },
    {
      country: "Allure",
      value: 2420
    },
    {
      country: "Teen Vogue",
      value: 1270
    },
    {
      country: "CN Traveller",
      value: 553
    },
    {
      country: "Wired",
      value: 731
    },
    {
      country: "Bon Appetite",
      value: 136
    },
    {
      country: "Ars tech",
      value: 682
    },
    {
      country: "AD",
      value: 239
    },
    {
      country: "The New Yorker",
      value: 367
    },
    {
      country: "Vanity Fair",
      value: 442
    }
  ];

  const barRef = useRef();
   
  const  width= 1000
  const height=800
  const margin = 400
  const padding = 50

  //Declaring the entrie code in use effect so that it will be triggered while the page is being loaded
  useEffect(() => {

    //referencing the svg where the chart is to be displayed
    const svg = select(barRef.current)
      .attr("width", width)
      .attr("height", height);

    //creacting a group variable 
    var g = svg
      .append("g")
      .attr("transform", "translate(" + 50 + "," + 50 + ")");

    //creating xScale
    const xScale = scaleBand()
      .domain(data.map(d => d.country))
      .range([0,width-padding])
      .padding(0.2)
      
    //creating yScale
    const yScale = scaleLinear()
      .domain([0,max(data.map(d => d.value))])
      .range([height-margin,0]);

    //appending xAxis
    g.append("g")
      .attr("transform", "translate(0," + (height - margin)+ ")")
      .call(
          axisBottom(xScale)
          )
          .call(g => g.select(".domain")
    .remove())
   
    //appending yAxis
    g.append("g")
    .call(
      axisLeft(yScale)
        .tickFormat(d => {
          return d + "M"
        })
        .ticks(4,"f")
        .tickSizeInner(-width)      
    )
    .call(g => g.select(".domain")
    .remove())
    .attr("class","yAxis")
    .style("text-anchor", "end");
    
    //Adding the rectangles
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.country))
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

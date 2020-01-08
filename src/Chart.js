import React, { useEffect, useRef } from "react";
import {
  select,
  scaleLinear,
  scaleBand,
  scaleTime,
  axisBottom,
  axisLeft,
  max,
  area,
  csv,
  timeParse,
  extent,
  line,
  curveBasis,
  timeFormat
} from "d3";
import csvData from "./mock_data.csv";
import withStyles from "react-jss";
import { version } from "punycode";

const styles = {
  yAxis: {
    strokeOpacity: "0.25",
    fontWeight: "bold",
    fontSize: "14px"
  },
  bar: {
    fill: "#55B1F3"
  },
  xAxis: {
    color: "#979797",
    fontSize: "12px"
  },
  svg: {
    margin: "20px"
  },
  linepath: {
    fill: "none",
    stroke: "maroon",
    strokeWidth: "5",
    strokeLinejoin: "round"
  }
};

const Chart = ({ classes, data, width, height, margin }) => {
  //referencing svg to ref variable
  const barRef = useRef();

  //wrap funtion to wrap xAxis label textOverflow
  var wrap = function() {
    var self = select(this),
      textLength = self.node().getComputedTextLength(),
      text = self.text();
    while (textLength > 50 && text.length > 0) {
      text = text.slice(0, -1);
      self.text(text + "...");
      textLength = self.node().getComputedTextLength();
    }
  };

  //Declaring the entrie code in use effect so that it will be triggered while the page is being loaded
  useEffect(() => {
    // const svg = select(barRef.current)
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("class", classes.svg);
    // // Declaring the render function to display data
    // const render = data => {
    //   const title = "Visits vs. Time";
    //   const xValue = d => d.Date;
    //   const xAxisLabel = "Time";
    //   const yValue = d => d.Allure;
    //   const yAxisLabel = "Views";
    //   const margin = { top: 60, bottom: 40, right: 80, left: 100 };
    //   const innerWidth = width - margin.left - margin.right;
    //   const innerHeight = height - margin.top - margin.bottom;
    //   const xScale = scaleTime()
    //     .domain(extent(data, xValue))
    //     .range(0, innerWidth)
    //     .nice();
    //   const yScale = scaleLinear()
    //     .domain(extent(data, yValue))
    //     .range(innerHeight, 0)
    //     .nice();
    //   const g = svg
    //     .append("g")
    //     .attr("transform", `translate(${margin.left},${margin.top})`);
    //   const xAxis = axisBottom(xScale)
    //     .tickSize(-innerHeight)
    //     .tickPadding(15);
    //   const yAxis = axisLeft(yScale)
    //     .tickSize(-innerWidth)
    //     .tickPadding(10);
    //   const yAxisG = g.append("g").call(yAxis);
    //   yAxisG.selectAll(".domain").remove();
    //   yAxisG
    //     .append("text")
    //     .attr("class", "axis-label")
    //     .attr("y", -60)
    //     .attr("x", -innerHeight / 2)
    //     .attr("fill", "black")
    //     .attr("transform", `rotate(-90)`)
    //     .attr("text-anchor", "middle")
    //     .text(yAxisLabel);
    //   const xAxisG = g
    //     .append("g")
    //     .call(xAxis)
    //     .attr("transform", `translate(0,${innerHeight})`);
    //   xAxisG.select(".domain").remove();
    //   xAxisG
    //     .append("text")
    //     .attr("class", "axis-label")
    //     .attr("y", 80)
    //     .attr("x", innerWidth / 2)
    //     .attr("fill", "black")
    //     .text(xAxisLabel);
    //   const lineGenerator = line()
    //     .x(d => xScale(xValue(d)))
    //     .y(d => yScale(yValue(d)))
    //     .curve(curveBasis);
    //   g.append("path")
    //     .attr("class", "line-path")
    //     .attr("d", lineGenerator(data));
    //   g.append("text")
    //     .attr("class", "title")
    //     .attr("y", -10)
    //     .text(title);
    // };

    //parsing the data into numbers and date
    var myData = csv(csvData).then(csvData => {
      csvData.forEach(d => {
        d.Allure = +d.Allure;
        d.Vogue = +d.Vogue;
        d.AD = +d.AD;
        d.CNTraveller = +d.CNTraveller;
        d.TeenVogue = +d.TeenVogue;
        d.Date = new Date(d.Date);
      });
      // return JSON.stringify(csvData);
      //return csvData;
      render(csvData);
    });

    //referencing the svg where the chart is to be displayed
    const svg = select(barRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("class", classes.svg);

    const render = data => {
      //creacting a group variable
      var g = svg
        .append("g")
        .attr("transform", "translate(" + 50 + "," + 0 + ")");

      // //creating xScale
      const xScale = scaleTime()
        .domain(data.map(d => d.Date))
        .range([0, width - margin])
        .nice();

      //creating yScale
      const yScale = scaleLinear()
        .domain([0, max(data.map(d => d.Allure))])
        .range([height - margin, margin]);

      //appending xAxis
      g.append("g")
        .attr("transform", "translate(0," + (height - margin) + ")")
        .call(
          axisBottom(xScale)
            .tickPadding(5)
            .ticks(100)
            .tickFormat(timeFormat("%d %B"))
        )
        .attr("class", "")
        .call(g => g.select(".domain").remove())
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .attr("dx", "-30px")
        .attr("class", classes.xAxis);

      // //appending yAxis
      g.append("g")
        .call(
          axisLeft(yScale)
            .ticks(10)
            .tickSizeInner(-width)
        )
        .call(g => g.select(".domain").remove())
        .attr("class", classes.yAxis);

      // const xScale = scaleBand()
      //   .domain(data.map(d => d.dimBranName))
      //   .range([0, width - margin])
      //   .padding(0.2);

      // //creating yScale
      // const yScale = scaleLinear()
      //   .domain([0, max(data.map(d => d.value))])
      //   .range([height - margin, margin]);
      // // //creating yScale
      // // const yScale = scaleLinear()
      // //   .domain([0, 100])
      // //   .range([height - margin, margin]);
      // //appending xAxis
      // g.append("g")
      //   .attr("transform", "translate(0," + (height - margin) + ")")
      //   .call(axisBottom(xScale).tickSize(0))
      //   .attr("class", "")
      //   .call(g => g.select(".domain").remove())
      //   .selectAll("text")
      //   .attr("transform", "rotate(-45)")
      //   .attr("dx", "-30px")
      //   .attr("class", classes.xAxis)
      //   .each(wrap);
      // //appending yAxis
      // g.append("g")
      //   .call(
      //     axisLeft(yScale)
      //       .tickFormat(d => {
      //         return d + "M";
      //       })
      //       .ticks(6)
      //       .tickSizeInner(-width)
      //   )
      //   .call(g => g.select(".domain").remove())
      //   .attr("class", classes.yAxis);
      // console.log(myData);
      // //Adding the rectangle for bar graphs
      // g.selectAll(".bar")
      //   .data(data)
      //   .enter()
      //   .append("rect")
      //   .attr("class", classes.bar)
      //   .attr("x", d => xScale(d.dimBranName))
      //   .attr("y", d => yScale(d.value))
      //   .attr("width", xScale.bandwidth())
      //   .attr("height", d => yScale(0) - yScale(d.value));
      // //Adding the rectangle for bar graphs
      // g.selectAll(".bar")
      //   .data(data)
      //   .enter()
      //   .append("rect")
      //   .attr("class", classes.bar)
      //   .attr("x", d => xScale(d.dimBranName))
      //   .attr("y", d => yScale(d.value))
      //   .attr("width", xScale.bandwidth())
      //   .attr("height", d => yScale(0) - yScale(d.value));
    };
  }, [data]);

  //returning svg component
  return (
    <svg width="100%" height="100%" ref={barRef}>
      {" "}
    </svg>
  );
};

export default withStyles(styles)(Chart);

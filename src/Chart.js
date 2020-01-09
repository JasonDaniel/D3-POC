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
    color: "#979797",
    fontSize: "12px"
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
  linepath1: {
    fill: "maroon",
    strokeLinejoin: "round",
    opacity: ".3"
  },
  linepath2: {
    fill: "green",
    strokeLinejoin: "round",
    opacity: ".3"
  },
  linepath3: {
    fill: "blue",
    strokeLinejoin: "round",
    opacity: ".3"
  },
  linepath4: {
    fill: "yellow",
    strokeLinejoin: "round",
    opacity: ".3"
  },
  linepath5: {
    fill: "pink",
    strokeLinejoin: "round",
    opacity: ".3"
  },
  title: {
    fontSize: "3.7em",
    fill: " #635F5D"
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
      console.log(csvData);
      render(csvData);
    });

    //referencing the svg where the chart is to be displayed
    const svg = select(barRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("class", classes.svg);
    const title = "Visits vs. Time";
    const render = data => {
      //creacting a group variable
      var g = svg
        .append("g")
        .attr("transform", "translate(" + 50 + "," + 0 + ")");

      //creating variables for x & y scales
      const xValue = d => d.Date;
      const yValue1 = d => d.Allure;
      const yValue2 = d => d.AD;
      const yValue3 = d => d.TeenVogue;
      const yValue4 = d => d.CNTraveller;
      const yValue5 = d => d.Vogue;

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // //creating xScale
      const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth]);
      //creating yScale
      const yScale = scaleLinear()
        .domain([0, max(data.map(d => d.Allure))])
        .range([innerHeight, 0]);

      //appending xAxis
      g.append("g")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(
          axisBottom(xScale)
            .ticks(30)
            .tickFormat(timeFormat("%d/%m"))
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
            .ticks(6)
            .tickSizeInner(-innerWidth)
        )
        .call(g => g.select(".domain").remove())
        .attr("class", classes.yAxis);

      const areaGenerator1 = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue1(d)));
      //.curve(curveBasis);

      const areaGenerator2 = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue2(d)));
      //.curve(curveBasis);

      const areaGenerator3 = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue3(d)));
      //.curve(curveBasis);

      const areaGenerator4 = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue4(d)));
      //.curve(curveBasis);

      const areaGenerator5 = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue5(d)));
      //.curve(curveBasis);

      g.append("path")
        .attr("class", classes.linepath1)
        .attr("d", areaGenerator1(data));

      g.append("path")
        .attr("class", classes.linepath2)
        .attr("d", areaGenerator2(data));

      g.append("path")
        .attr("class", classes.linepath3)
        .attr("d", areaGenerator3(data));

      g.append("path")
        .attr("class", classes.linepath4)
        .attr("d", areaGenerator4(data));

      g.append("path")
        .attr("class", classes.linepath5)
        .attr("d", areaGenerator5(data));

      g.append("text")
        .attr("class", classes.title)
        .attr("y", -10)
        .text(title);

      // //defining area
      // const areaGenerator = area()
      //   .x(d => xScale(xValue(d)))
      //   .y0(innerHeight)
      //   .y1(d => yScale(yValue1(d)))
      //   .curve(curveBasis);

      // g.append("path")
      //   .attr("class", classes.linepath)
      //   .attr("d", areaGenerator(data));

      // //defining text
      // g.append("text")
      //   .attr("class", "title")
      //   .attr("y", -10)
      //   .text(title);

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

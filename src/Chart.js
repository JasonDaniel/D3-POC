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
  timeFormat,
  zoom,
  brush
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
  brushpath1: {
    fill: "maroon",
    strokeLinejoin: "round",
    opacity: ".3"
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

const Chart = ({ classes, data, width, height, height2, margin1, margin2 }) => {
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

      const innerWidth = width - margin1.left - margin1.right;
      const innerHeight = height - margin1.top - margin1.bottom;
      const innerHeight2 = height - margin2.top - margin2.bottom;

      // //creating xScale
      const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth]);
      //creating yScale
      const yScale = scaleLinear()
        .domain([0, max(data.map(d => d.Allure))])
        .range([innerHeight, 0]);

      const yScale2 = scaleLinear()
        .domain([0, max(data.map(d => d.Allure))])
        .range([innerHeight2, 0]);
      const xAxis2 = axisBottom(xScale);
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
      // //.curve(curveBasis);

      const areaGenerator3 = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue3(d)));
      // //.curve(curveBasis);

      // const areaGenerator4 = area()
      //   .x(d => xScale(xValue(d)))
      //   .y0(innerHeight)
      //   .y1(d => yScale(yValue4(d)));
      // //.curve(curveBasis);

      // const areaGenerator5 = area()
      //   .x(d => xScale(xValue(d)))
      //   .y0(innerHeight)
      //   .y1(d => yScale(yValue5(d)));
      // //.curve(curveBasis);

      const areaGeneratorBrush = area()
        .x(d => xScale(xValue(d)))
        .y0(180)
        .y1(d => yScale2(yValue1(d)));
      //.curve(curveBasis);

      g.append("path")
        .attr("class", classes.linepath1)
        .attr("d", areaGenerator1(data));

      // g.append("path")
      //   .attr("class", classes.linepath2)
      //   .attr("d", areaGenerator2(data));

      // g.append("path")
      //   .attr("class", classes.linepath3)
      //   .attr("d", areaGenerator3(data));

      // g.append("path")
      //   .attr("class", classes.linepath4)
      //   .attr("d", areaGenerator4(data));

      // g.append("path")
      //   .attr("class", classes.linepath5)
      //   .attr("d", areaGenerator5(data));

      // g.append("text")
      //   .attr("class", classes.title)
      //   .attr("y", -10)
      //   .text(title);

      var context = svg
        .append("g")
        .attr("class", "context")
        .attr("transform", "translate(50," + 580 + ")");

      context
        .append("path")
        .attr("class", classes.brushpath1)
        .attr("d", areaGeneratorBrush(data));

      context
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0,180)")
        .call(xAxis2);
    };
  }, [csvData]);

  //returning svg component
  return (
    <svg width="100%" height="100%" ref={barRef}>
      {" "}
    </svg>
  );
};

export default withStyles(styles)(Chart);

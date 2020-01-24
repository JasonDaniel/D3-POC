import React, { useEffect, useRef, useState } from "react";
import Tooltip from "./tooltip";
import {
  select,
  scaleLinear,
  scaleTime,
  axisBottom,
  axisLeft,
  max,
  area,
  csv,
  extent,
  brushX
} from "d3";

import * as d3 from "d3";
import csvData from "./TNY.csv";
import "./App.css";
import withStyles from "react-jss";

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
    fill: "#23dced",
    stroke: "black",
    strokeWidth: "2",
    strokeLinejoin: "round",
    opacity: ".7",
    "&:hover": {
      opacity: "1"
    }
  },
  linepath2: {
    fill: "green",
    strokeLinejoin: "round",
    opacity: ".2",
    "&:hover": {
      opacity: "1"
    }
  },
  linepath3: {
    fill: "blue",
    strokeLinejoin: "round",
    opacity: ".2",
    "&:hover": {
      opacity: "1"
    }
  },
  linepath4: {
    fill: "yellow",
    strokeLinejoin: "round",
    opacity: ".2",
    "&:hover": {
      opacity: "1"
    }
  },
  linepath5: {
    fill: "pink",
    strokeLinejoin: "round",
    opacity: ".2",
    "&:hover": {
      opacity: "1"
    }
  },
  tooltip: {
    stroke: "black",
    fill: "#1d858f"
  },
  circle: {
    fill: "maroon",
    strokeLinejoin: "round",
    opacity: ".5",
    "&:hover": {
      opacity: "1"
    }
  },
  title: {
    fontSize: "3.7em",
    fill: " #635F5D"
  }
};

const Chart = ({ classes, width, height, height2, margin1, margin2 }) => {
  const title = `Page visits vs. Time`;
  const brand = "The New Yorker";
  const [tooltipProp, setTooltipProp] = useState({});
  const [tooltipDisplay, setTooltipDisplay] = useState("false");
  useEffect(() => {
    csv(csvData).then(csvData => {
      csvData.forEach(d => {
        d.page_views = +d.page_views;
        d.Date = new Date(d.Date);
      });
      render1(csvData);
    });
  }, []);

  //render function definition
  const render1 = data => {
    const innerWidth = width - margin1.left - margin1.right;
    const innerHeight = height - margin1.top - margin1.bottom;
    const innerHeight2 = height - margin2.top - margin2.bottom;
    const svg = select("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", classes.svg)
      .attr("transform", "translate(70,120)");

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("transform", "translate(70,0)");

    //creating context for brush
    var context = svg
      .append("g")
      .attr("class", "context")
      .attr("transform", "translate(70," + 500 + ")");

    //creacting a group variable
    var g = svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", "translate(70,10)");

    //formating csv data
    const xValue = d => d.Date;
    const yValue = d => d.page_views;

    // //creating xScale
    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, width]);
    //creating yScale
    const yScale = scaleLinear()
      .domain([0, max(data.map(yValue))])
      .range([innerHeight, 0]);
    //creating x scale for brush
    const xScale2 = scaleTime()
      .domain(extent(data, xValue))
      .range([0, width]);
    //creating y scale for brush
    const yScale2 = scaleLinear()
      .domain([0, max(data.map(yValue))])
      .range([innerHeight2, 0]);

    //x axis for brush
    const xAxis2 = axisBottom(xScale2);
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale)
      .ticks(4)
      .tickSizeInner(-innerWidth);

    //defining Area generator for main chart
    const areaGenerator1 = area()
      .x(d => xScale(d.Date))
      .y0(innerHeight)
      .y1(d => yScale(d.page_views));

    //defining area chart for brush
    const areaGeneratorBrush1 = area()
      .x(d => xScale2(xValue(d)))
      .y0(180)
      .y1(d => yScale2(yValue(d)));

    //appending XAxis
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + innerHeight + ")")
      .call(xAxis)
      .selectAll("text");

    // //appending yAxis
    g.append("g")
      .call(yAxis)
      .attr("transform", "translate(0,0)")
      .attr("class", classes.yAxis)
      .attr("dy", "-300px");

    //appending area for main chart
    g.append("path")
      .attr("class", classes.linepath1)
      .attr("d", areaGenerator1(data));

    //creating tool tip circle and text
    g.append("circle")
      .attr("class", classes.tooltip)
      .attr("r", 4);

    g.append("text")
      .attr("class", classes.tooltip)
      .attr("dy", "-1em");

    //getting tooltip position
    var bisectDate = d3.bisector(d => d.Date).left;
    var formatOutput = function(d) {
      return d.Date + " - " + d.page_views + "views";
    };

    //adding mouse enter n leave action
    g.on("mousemove", function() {
      var xTooltipPos = d3.mouse(this)[0];
      var xTooltipPoint = xScale.invert(xTooltipPos);
      var i = bisectDate(data, xTooltipPoint, 1);
      var d0 = data[i - 1];
      var d1 = data[i];
      var d = xTooltipPoint - d0.Date > d1.Date - xTooltipPoint ? d1 : d0;
      g.select("circle")
        .attr("data", data)
        .attr(
          "transform",
          "translate(" + xScale(d.Date) + "," + yScale(d.page_views) + ")"
        );
      setTooltipProp(data[i]);
    })
      .on("mouseout", function() {
        g.select("circle").style("opacity", 0);
        setTooltipDisplay("false");
      })
      .on("mouseover", function() {
        g.select("circle").style("opacity", 1);
        setTooltipDisplay("true");
      });

    //appending axis for brush
    context
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0,180)")
      .call(xAxis2);

    //appending area for brush
    context
      .append("path")
      .attr("class", classes.linepath1)
      .attr("d", areaGeneratorBrush1(data));

    //brush function definition
    const brushed = () => {
      var s = d3.event.selection || xScale2.range();
      xScale.domain(s.map(xScale2.invert, xScale2));
      g.select(`.${classes.linepath1}`).attr("d", areaGenerator1(data));
      g.select(".x.axis").call(xAxis);
    };

    //creating brush variable
    const brush = brushX().on("brush", brushed);

    //adding brush function to brush context
    context
      .append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", 5)
      .attr("height", height2 + 10);
  };

  return (
    <div>
      <svg width="100%" height="100%">
        {" "}
      </svg>
      <Tooltip
        data={tooltipProp}
        tooltipDisplay={tooltipDisplay}
        title={title}
        brand={brand}
      />
    </div>
  );
};

export default withStyles(styles)(Chart);

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import csvData from "./mock_data.csv";
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
    margin1: "20px"
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

const Chart = () => {
  //referencing svg to ref variable
  const barRef = useRef();

  var svg = d3.select("svg"),
    margin = { top: 20, right: 20, bottom: 110, left: 40 },
    margin2 = { top: 430, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

  var parseDate = d3.timeParse("%b %Y");

  var x = d3.scaleTime().range([0, width]),
    x2 = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y2 = d3.scaleLinear().range([height2, 0]);

  var xAxis = d3.axisBottom(x),
    xAxis2 = d3.axisBottom(x2),
    yAxis = d3.axisLeft(y);

  var brush = d3
    .brushX()
    .extent([
      [0, 0],
      [width, height2]
    ])
    .on("brush end", brushed);

  var zoom = d3
    .zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([
      [0, 0],
      [width, height]
    ])
    .extent([
      [0, 0],
      [width, height]
    ])
    .on("zoom", zoomed);

  var area = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x(function(d) {
      return x(d.Date);
    })
    .y0(height)
    .y1(function(d) {
      return y(d.Allure);
    });

  var area2 = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x(function(d) {
      return x2(d.Date);
    })
    .y0(height2)
    .y1(function(d) {
      return y2(d.Allure);
    });

  svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  var focus = svg
    .append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var context = svg
    .append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  d3.csv("csvData.csv", type, function(error, data) {
    if (error) throw error;

    x.domain(
      d3.extent(data, function(d) {
        return d.Date;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.Allure;
      })
    ]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    focus
      .append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

    focus
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    focus
      .append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);

    context
      .append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area2);

    context
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

    context
      .append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, x.range());

    svg
      .append("rect")
      .attr("class", "zoom")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);
  });

  function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    var s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    focus.select(".area").attr("d", area);
    focus.select(".axis--x").call(xAxis);
    svg
      .select(".zoom")
      .call(
        zoom.transform,
        d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
      );
  }

  function zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
    var t = d3.event.transform;
    x.domain(t.rescaleX(x2).domain());
    focus.select(".area").attr("d", area);
    focus.select(".axis--x").call(xAxis);
    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
  }

  function type(d) {
    d.Date = parseDate(d.Date);
    d.Allure = +d.Allure;
    return d;
  }

  //returning svg component
  return (
    <svg width="100%" height="100%" ref={barRef}>
      {" "}
    </svg>
  );
};

export default withStyles(styles)(Chart);

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
  brushX,
  event,
  zoomIdentity
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
    fill: "maroon",
    strokeLinejoin: "round",
    opacity: ".2",
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
  circle: {
    fill: "black",
    strokeLinejoin: "round",
    opacity: "1",
    "&:hover": {
      opacity: "1"
    }
  },
  title: {
    fontSize: "3.7em",
    fill: " #635F5D"
  }
};

class Chart1 extends React.Component {
  constructor(props) {
    super(props);
  }

  //   const barRef = useRef();

  //render function definition
  render1 = data => {
    const { classes, width, height, height2, margin1, margin2 } = this.props;
    const title = "Visits vs. Time";
    const innerWidth = width - margin1.left - margin1.right;
    const innerHeight = height - margin1.top - margin1.bottom;
    const innerHeight2 = height - margin2.top - margin2.bottom;
    const svg = select("svg")
      .attr("width", width + margin1.left + margin1.right)
      .attr("height", height)
      .attr("class", classes.svg)
      .attr("transform", "translate(50,10)");

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    //creating context for brush
    var context = svg
      .append("g")
      .attr("class", "context")
      .attr("transform", "translate(50," + 600 + ")");

    //creacting a group variable
    var g = svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", "translate(50,10)");

    //formating csv data
    const xValue = d => d.Date;
    const yValue = d => d.page_views;
    // const yValue2 = d => d.AD;
    // const yValue3 = d => d.TeenVogue;
    // const yValue4 = d => d.CNTraveller;
    // const yValue5 = d => d.Vogue;

    // //creating xScale
    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth]);
    //creating yScale
    const yScale = scaleLinear()
      .domain([0, max(data.map(yValue))])
      .range([innerHeight, 0]);
    //creating x scale for brush
    const xScale2 = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth]);
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

    // //defining Area generator for main chart
    // const areaGenerator2 = area()
    //   .x(d => xScale(d.Date))
    //   .y0(innerHeight)
    //   .y1(d => yScale(d.AD));

    // //defining Area generator for main chart
    // const areaGenerator3 = area()
    //   .x(d => xScale(d.Date))
    //   .y0(innerHeight)
    //   .y1(d => yScale(d.CNTraveller));

    // //defining Area generator for main chart
    // const areaGenerator4 = area()
    //   .x(d => xScale(d.Date))
    //   .y0(innerHeight)
    //   .y1(d => yScale(d.Vogue));

    // //defining Area generator for main chart
    // const areaGenerator5 = area()
    //   .x(d => xScale(d.Date))
    //   .y0(innerHeight)
    //   .y1(d => yScale(d.TeenVogue));

    //defining area chart for brush
    const areaGeneratorBrush1 = area()
      .x(d => xScale2(xValue(d)))
      .y0(180)
      .y1(d => yScale2(yValue(d)));

    // //defining area chart for brush
    // const areaGeneratorBrush2 = area()
    //   .x(d => xScale2(xValue(d)))
    //   .y0(180)
    //   .y1(d => yScale2(yValue2(d)));

    // //defining area chart for brush
    // const areaGeneratorBrush3 = area()
    //   .x(d => xScale2(xValue(d)))
    //   .y0(180)
    //   .y1(d => yScale2(yValue3(d)));

    // //defining area chart for brush
    // const areaGeneratorBrush4 = area()
    //   .x(d => xScale2(xValue(d)))
    //   .y0(180)
    //   .y1(d => yScale2(yValue4(d)));

    // //defining area chart for brush
    // const areaGeneratorBrush5 = area()
    //   .x(d => xScale2(xValue(d)))
    //   .y0(180)
    //   .y1(d => yScale2(yValue5(d)));

    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + innerHeight + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("dx", "-30px");

    //appending dots with tooltip
    // Add the scatterplot
    g.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", xValue)
      .attr("cy", yValue)
      .on("mouseover", function(d) {
        svg
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        svg
          .html(d.Date + "<br/>" + d.page_views)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function(d) {
        svg
          .transition()
          .duration(500)
          .style("opacity", 0);
      });

    //.attr("class", classes.xAxis);
    //appending xAxis
    // g.append("g")
    //   .attr("transform", "translate(0," + innerHeight + ")")
    //   .call(
    //     axisBottom(xScale)
    //       .ticks(30)
    //       .tickFormat(timeFormat("%d/%m"))
    //   )
    //   .attr("class", "")
    //   .call(g => g.select(".domain").remove())
    //   .selectAll("text")
    //   .attr("transform", "rotate(-45)")
    //   .attr("dx", "-30px")
    //   .attr("class", classes.xAxis);

    // //appending yAxis
    g.append("g")
      .call(yAxis)
      .attr("transform", "translate(0,0)")
      //.call(g => g.select(".domain").remove())
      .attr("class", classes.yAxis)
      .attr("dy", "-300px");

    //appending area for main chart
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

    // context
    //   .append("path")
    //   .attr("class", classes.linepath2)
    //   .attr("d", areaGeneratorBrush2(data));

    // context
    //   .append("path")
    //   .attr("class", classes.linepath3)
    //   .attr("d", areaGeneratorBrush3(data));

    // context
    //   .append("path")
    //   .attr("class", classes.linepath4)
    //   .attr("d", areaGeneratorBrush4(data));

    // context
    //   .append("path")
    //   .attr("class", classes.linepath5)
    //   .attr("d", areaGeneratorBrush5(data));

    const brushed = () => {
      var s = d3.event.selection || xScale2.range();
      xScale.domain(s.map(xScale2.invert, xScale2));
      g.select(`.${classes.linepath1}`).attr("d", areaGenerator1(data));
      //   g.select(`.${classes.linepath2}`).attr("d", areaGenerator2(data));
      //   g.select(`.${classes.linepath3}`).attr("d", areaGenerator3(data));
      //   g.select(`.${classes.linepath4}`).attr("d", areaGenerator4(data));
      //   g.select(`.${classes.linepath5}`).attr("d", areaGenerator5(data));

      //g.select(".areachart").attr("d", areaGenerator2(data));
      //   g.select(".areachart").attr("d", areaGenerator2(data));
      g.select(".x.axis").call(xAxis);
    };

    const brush = brushX().on("brush", brushed);

    context
      .append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", 5)
      .attr("height", height2 + 10);
  };

  componentWillReceiveProps() {
    var myData = csv(csvData).then(csvData => {
      csvData.forEach(d => {
        d.page_views = +d.page_views;
        // d.Vogue = +d.Vogue;
        // d.AD = +d.AD;
        // d.CNTraveller = +d.CNTraveller;
        // d.TeenVogue = +d.TeenVogue;
        d.Date = new Date(d.Date);
      });
      this.render1(csvData);
    });
  }
  componentDidMount() {
    //parsing the data into numbers and date
    var myData = csv(csvData).then(csvData => {
      csvData.forEach(d => {
        d.page_views = +d.page_views;
        // d.Vogue = +d.Vogue;
        // d.AD = +d.AD;
        // d.CNTraveller = +d.CNTraveller;
        // d.TeenVogue = +d.TeenVogue;
        d.Date = new Date(d.Date);
      });
      this.render1(csvData);
    });
  }

  render() {
    return (
      <svg width="100%" height="100%">
        {" "}
      </svg>
    );
  }
}

export default withStyles(styles)(Chart1);

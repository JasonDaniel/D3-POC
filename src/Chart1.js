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
import csvData from "./mock_data.csv";
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
    stroke: "maroon",
    strokeWidth: 5,
    fill: "none",
    strokeLinejoin: "round",
    opacity: ".2",
    "&:hover": {
      opacity: "1"
    }
  },
  linepath2: {
    stroke: "green",
    strokeWidth: 5,
    fill: "none",
    strokeLinejoin: "round",
    opacity: ".2",
    "&:hover": {
      opacity: "1"
    }
  },
  linepath3: {
    stroke: "blue",
    strokeWidth: 5,
    fill: "none",
    strokeLinejoin: "round",
    opacity: ".2",
    "&:hover": {
      opacity: "1"
    }
  },
  linepath4: {
    stroke: "yellow",
    strokeWidth: 5,
    fill: "none",
    strokeLinejoin: "round",
    opacity: ".2",
    "&:hover": {
      opacity: "1"
    }
  },
  linepath5: {
    stroke: "pink",
    strokeWidth: 5,
    fill: "none",
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
    const svg = select("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", classes.svg);

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    const title = "Visits vs. Time";
    const innerWidth = width - margin1.left - margin1.right;
    const innerHeight = height - margin1.top - margin1.bottom;
    const innerHeight2 = height - margin2.top - margin2.bottom;
    //creating context for brush
    var context = svg
      .append("g")
      .attr("class", "context")
      .attr("transform", "translate(50," + 600 + ")");

    //creacting a group variable
    var g = svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + 50 + "," + 10 + ")");

    //formating csv data
    const xValue = d => d.Date;
    const yValue1 = d => d.Allure;
    const yValue2 = d => d.AD;
    const yValue3 = d => d.TeenVogue;
    const yValue4 = d => d.CNTraveller;
    const yValue5 = d => d.Vogue;
    // //creating xScale
    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth]);
    //creating yScale
    const yScale = scaleLinear()
      .domain([0, max(data.map(d => d.Allure))])
      .range([innerHeight, 0]);
    //creating x scale for brush
    const xScale2 = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth]);
    //creating y scale for brush
    const yScale2 = scaleLinear()
      .domain([0, max(data.map(d => d.Allure))])
      .range([innerHeight2, 0]);

    //x axis for brush
    const xAxis2 = axisBottom(xScale2);
    const xAxis = axisBottom(xScale);

    //defining Area generator for main chart
    const areaGenerator1 = line()
      .x(d => xScale(d.Date))
      //.y0(innerHeight)
      .y(d => yScale(d.Allure));

    //defining Area generator for main chart
    const areaGenerator2 = line()
      .x(d => xScale(d.Date))
      //.y0(innerHeight)
      .y(d => yScale(d.AD));

    //defining Area generator for main chart
    const areaGenerator3 = line()
      .x(d => xScale(d.Date))
      // .y0(innerHeight)
      .y(d => yScale(d.CNTraveller));

    //defining Area generator for main chart
    const areaGenerator4 = line()
      .x(d => xScale(d.Date))
      // .y0(innerHeight)
      .y(d => yScale(d.Vogue));

    //defining Area generator for main chart
    const areaGenerator5 = line()
      .x(d => xScale(d.Date))
      // .y0(innerHeight)
      .y(d => yScale(d.TeenVogue));

    //defining area chart for brush
    const areaGeneratorBrush1 = line()
      .x(d => xScale2(xValue(d)))
      // .y0(180)
      .y(d => yScale2(yValue1(d)));

    //defining area chart for brush
    const areaGeneratorBrush2 = line()
      .x(d => xScale2(xValue(d)))
      //.y0(180)
      .y(d => yScale2(yValue2(d)));

    //defining area chart for brush
    const areaGeneratorBrush3 = line()
      .x(d => xScale2(xValue(d)))
      // .y0(180)
      .y(d => yScale2(yValue3(d)));

    //defining area chart for brush
    const areaGeneratorBrush4 = line()
      .x(d => xScale2(xValue(d)))
      // .y0(180)
      .y(d => yScale2(yValue4(d)));

    //defining area chart for brush
    const areaGeneratorBrush5 = line()
      .x(d => xScale2(xValue(d)))
      // .y0(180)
      .y(d => yScale2(yValue5(d)));

    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + innerHeight + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("dx", "-30px");

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
      .call(
        axisLeft(yScale)
          .ticks(6)
          .tickSizeInner(-innerWidth)
      )
      .call(g => g.select(".domain").remove())
      .attr("class", classes.yAxis);

    //appending area for main chart
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

    context
      .append("path")
      .attr("class", classes.linepath2)
      .attr("d", areaGeneratorBrush2(data));

    context
      .append("path")
      .attr("class", classes.linepath3)
      .attr("d", areaGeneratorBrush3(data));

    context
      .append("path")
      .attr("class", classes.linepath4)
      .attr("d", areaGeneratorBrush4(data));

    context
      .append("path")
      .attr("class", classes.linepath5)
      .attr("d", areaGeneratorBrush5(data));

    const brushed = () => {
      var s = d3.event.selection || xScale2.range();
      xScale.domain(s.map(xScale2.invert, xScale2));
      g.select(`.${classes.linepath1}`).attr("d", areaGenerator1(data));
      g.select(`.${classes.linepath2}`).attr("d", areaGenerator2(data));
      g.select(`.${classes.linepath3}`).attr("d", areaGenerator3(data));
      g.select(`.${classes.linepath4}`).attr("d", areaGenerator4(data));
      g.select(`.${classes.linepath5}`).attr("d", areaGenerator5(data));

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
        d.Allure = +d.Allure;
        d.Vogue = +d.Vogue;
        d.AD = +d.AD;
        d.CNTraveller = +d.CNTraveller;
        d.TeenVogue = +d.TeenVogue;
        d.Date = new Date(d.Date);
      });
      this.render1(csvData);
    });
  }
  componentDidMount() {
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

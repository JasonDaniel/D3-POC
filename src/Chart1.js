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

  brushed = (xScale, xScale2, brush, g, areaGenerator1, xAxis) => {
    console.log(brush.extent([10, 50]));
    //if (brush) xScale.domain(brush.empty() ? xScale2.domain() : brush.extent());
    //xScale.domain(brush.extent());
    console.log(xScale(5));
    xScale.domain(50, 200);
    g.select(".area").attr("d", areaGenerator1);
    g.select(".x.axis").call(xAxis);
  };
  //render function definition
  render1 = data => {
    const { classes, width, height, height2, margin1, margin2 } = this.props;
    const svg = select("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", classes.svg);
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
    const xAxis = axisBottom(xScale)
      .ticks(30)
      .tickFormat(timeFormat("%d/%m"));

    //defining Area generator for main chart
    const areaGenerator1 = area()
      .x(d => xScale(xValue(d)))
      .y0(innerHeight)
      .y1(d => yScale(yValue1(d)));
    // const areaGenerator2 = area()
    //   .x(d => xScale(xValue(d)))
    //   .y0(innerHeight)
    //   .y1(d => yScale(yValue2(d)));
    // const areaGenerator3 = area()
    //   .x(d => xScale(xValue(d)))
    //   .y0(innerHeight)
    //   .y1(d => yScale(yValue3(d)));
    // const areaGenerator4 = area()
    //   .x(d => xScale(xValue(d)))
    //   .y0(innerHeight)
    //   .y1(d => yScale(yValue4(d)));

    //defining area chart for brush
    const areaGeneratorBrush1 = area()
      .x(d => xScale2(xValue(d)))
      .y0(180)
      .y1(d => yScale2(yValue1(d)));
    // const areaGeneratorBrush2 = area()
    //   .x(d => xScale2(xValue(d)))
    //   .y0(180)
    //   .y1(d => yScale2(yValue2(d)));
    // const areaGeneratorBrush3 = area()
    //   .x(d => xScale2(xValue(d)))
    //   .y0(180)
    //   .y1(d => yScale2(yValue3(d)));
    // const areaGeneratorBrush4 = area()
    //   .x(d => xScale2(xValue(d)))
    //   .y0(180)
    //   .y1(d => yScale2(yValue4(d)));

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + innerHeight + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("dx", "-30px")
      .attr("class", classes.xAxis);
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

    // g.append("path")
    //   .attr("class", classes.linepath2)
    //   .attr("d", areaGenerator2(data));

    // g.append("path")
    //   .attr("class", classes.linepath3)
    //   .attr("d", areaGenerator3(data));

    // g.append("path")
    //   .attr("class", classes.linepath4)
    //   .attr("d", areaGenerator4(data));

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

    var brush = brushX().extent([
      [0, 0],
      [width, 300]
    ]);
    brush.on("brush", () => {
      this.brushed(xScale, xScale2, brush, g, areaGenerator1, xAxis);
      console.log("executes");
      //   this.setState({ test: "true" });
    });

    context
      .append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", 5)
      .attr("height", height2 + 10);

    // context
    //   .append("g")
    //   .attr("class", "brush")
    //   .call(brush)
    //   .call(brush.move, xScale.range());
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
// const Chart1 = ({
//   classes,
//   data,
//   width,
//   height,
//   height2,
//   margin1,
//   margin2
// }) => {
//referencing svg to ref variable
// var focus = svg
//   .append("g")
//   .attr("class", "focus")
//   .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
//const barRef = useRef();
//   const svg = select(barRef.current)
//     .attr("width", width)
//     .attr("height", height)
//     .attr("class", classes.svg);
//   const title = "Visits vs. Time";
//   const innerWidth = width - margin1.left - margin1.right;
//   const innerHeight = height - margin1.top - margin1.bottom;
//   const innerHeight2 = height - margin2.top - margin2.bottom;
//   // //creating xScale
//   const xScale = scaleTime().range([0, innerWidth]);
//   //creating yScale
//   const yScale = scaleLinear().range([innerHeight, 0]);
//   //creating x scale for brush
//   const xScale2 = scaleTime().range([0, innerWidth]);
//   //creating y scale for brush
//   const yScale2 = scaleLinear().range([innerHeight2, 0]);
//   //defining axis
//   var xAxis = axisBottom(xScale),
//     xAxis2 = axisBottom(xScale2),
//     yAxis = axisLeft(yScale);
//   //adding brush component
//   var brush = brushX()
//     .extent([
//       [0, 0],
//       [width, height2]
//     ])
//     .on("brush", brushed);
//   var brush = brushX()
//     .extent([
//       [0, 0],
//       [width, height2]
//     ])
//     .on("brush end", brushed);
//   //adding zoom component
//   var zoom = zoom()
//     .scaleExtent([1, Infinity])
//     .translateExtent([
//       [0, 0],
//       [width, height]
//     ])
//     .extent([
//       [0, 0],
//       [width, height]
//     ])
//     .on("zoom", zoomed);
//defining Area generator for main chart
//   const areaGenerator1 = area()
//     .x(d => xScale(d.Date))
//     .y0(innerHeight)
//     .y1(d => yScale(d.Allure));
//   //defining area chart for brush
//   const areaGeneratorBrush1 = area()
//     .x(d => xScale2(d.Date))
//     .y0(180)
//     .y1(d => yScale2(d.Allure));
//   //formating csv data
//   const xValue = d => d.Date;
//   const yValue1 = d => d.Allure;
//   const yValue2 = d => d.AD;
//   const yValue3 = d => d.TeenVogue;
//   const yValue4 = d => d.CNTraveller;
//   const yValue5 = d => d.Vogue;
//   //clipping to chart area
//   svg
//     .append("defs")
//     .append("clipPath")
//     .attr("id", "clip")
//     .append("rect")
//     .attr("width", width)
//     .attr("height", height);
//   //adding chart content
//   var focus = svg
//     .append("g")
//     .attr("transform", "translate(" + 50 + "," + 10 + ")")
//     .attr("class", "focus");
//   //adding brush content
//   var context = svg
//     .append("g")
//     .attr("class", "context")
//     .attr("transform", "translate(50," + 600 + ")");
//   //function to extract data
//   csv(csvData, function(error, data) {
//     if (error) throw error;
//     xScale.domain(
//       extent(
//         data.map(function(d) {
//           return xValue(d);
//         })
//       )
//     );
//     yScale.domain([
//       0,
//       max(
//         data.map(function(d) {
//           return d.Allure;
//         })
//       )
//     ]);
//     xScale2.domain(xScale.domain());
//     yScale2.domain(yScale.domain());
//     focus
//       .append("path")
//       .datum(data)
//       .attr("class", "area")
//       .attr("d", areaGenerator1);
//     focus
//       .append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);
//     focus
//       .append("g")
//       .attr("class", "y axis")
//       .call(yAxis);
//     context
//       .append("path")
//       .datum(data)
//       .attr("class", "area")
//       .attr("d", areaGeneratorBrush1);
//     context
//       .append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height2 + ")")
//       .call(xAxis2);
//     context
//       .append("g")
//       .attr("class", "x brush")
//       .call(brush)
//       .selectAll("rect")
//       .attr("y", -6)
//       .attr("height", height2 + 7);
//   });
//   function brushed() {
//     xScale.domain(brush.empty() ? xScale2.domain() : brush.extent());
//     focus.select(".area").attr("d", areaGenerator1);
//     focus.select(".x.axis").call(xAxis);
//   }
//   function brushed() {
//     if (event.sourceEvent && event.sourceEvent.type != "brush") return; // ignore brush-by-zoom
//     var s = event.selection || xScale2.range();
//     xScale.domain(s.map(xScale2.invert, xScale2));
//     focus.select(".area").attr("d", areaGenerator1);
//     focus.select(".axis--x").call(xAxis);
//     svg
//       .select(".zoom")
//       .call(
//         zoom.transform,
//         zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
//       );
//   }
//   function zoomed() {
//     if (event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
//     var t = event.transform;
//     xScale.domain(t.rescaleX(xScale2).domain());
//     focus.select(".area").attr("d", areaGenerator1);
//     focus.select(".axis--x").call(xAxis);
//     context.select(".brush").call(brush.move, xScale.range().map(t.invertX, t));
//   }
//   function type(d) {
//     d.Date = new Date(d.Date);
//     d.Allure = +d.Allure;
//     return d;
//   }
//};

export default withStyles(styles)(Chart1);

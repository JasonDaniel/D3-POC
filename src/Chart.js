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
        .attr("transform", "translate(" + 50 + "," + 10 + ")");

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
      //creating x scale for brush
      const xScale2 = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth]);
      //creating y scale for brush
      const yScale2 = scaleLinear()
        .domain([0, max(data.map(d => d.Allure))])
        .range([innerHeight2, 0]);

      //axis for brush
      const xAxis2 = axisBottom(xScale2);
      const xAxis = axisBottom(xScale);

      var focus = svg
        .append("g")
        .attr("class", "focus")
        .attr(
          "transform",
          "translate(" + margin1.left + "," + margin1.top + ")"
        );

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

      //defining Area generator
      const areaGenerator1 = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue1(d)));
      //.curve(curveBasis);

      // //defining brush
      // var brush = brushX()
      //   .extent([
      //     [0, 0],
      //     [width, height2]
      //   ])
      //   .on("brush end", brushed(xScale, xScale2, areaGenerator1, focus));

      // const brushed = (xScale, xScale2, areaGenerator1, focus) => {
      //   xScale.domain(brush.empty() ? xScale2.domain() : brush.extent());
      //   focus.select(".area").attr("d", areaGenerator1);
      //   focus.select(".x.axis").call(xAxis);
      // };

      // //brushed function definition
      // const brushed = (xScale, xScale2, focus, areaGenerator1) => {
      //   if (event.sourceEvent && event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
      //   var s = event.selection || xScale2.range();
      //   xScale.domain(s.map(xScale2.invert, xScale2));
      //   focus.select(".area").attr("d", areaGenerator1);
      //   focus.select(".axis--x").call(xAxis);
      //   svg
      //     .select(".zoom")
      //     .call(
      //       zoom.transform,
      //       zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
      //     );
      // };

      // //zoomed function definition
      // const zoomed = () => {
      //   if (event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
      //   var t = event.transform;
      //   xScale.domain(t.rescaleX(xScale2).domain());
      //   focus.select(".area").attr("d", area);
      //   focus.select(".axis--x").call(xAxis);
      //   context
      //     .select(".brush")
      //     .call(brush.move, xScale.range().map(t.invertX, t));
      // };

      const areaGenerator2 = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue2(d)));

      const areaGenerator3 = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue3(d)));

      const areaGenerator4 = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue4(d)));

      //appending circle for points
      // g.selectAll("circle")
      //   .data(data)
      //   .enter()
      //   .append("circle")
      //   .attr("cy", d => yScale(yValue1(d)))
      //   .attr("cx", d => xScale(xValue(d)))
      //   .attr("class", classes.circle)
      //   .attr("r", 5);
      // .on("mouseover", function(d) {
      //   svg
      //     .transition()
      //     .duration(200)
      //     .style("opacity", 0.9);
      //   svg
      //     .html(`${d => xScale(xValue(d))} <br/> ${d => yScale(yValue1(d))}`)
      //     .style("left", event.pageX + "px")
      //     .style("top", event.pageY - 28 + "px");
      // })
      // .on("mouseout", function(d) {
      //   svg
      //     .transition()
      //     .duration(500)
      //     .style("opacity", 0);
      // });

      // g.selectAll("circle")
      //   .data(data)
      //   .enter()
      //   .append("circle")
      //   .attr("cy", d => yScale(yValue2(d)))
      //   .attr("cx", d => xScale(xValue(d)))
      //   .attr("class", classes.circle)
      //   .attr("r", 5);

      // g.selectAll("circle")
      //   .data(data)
      //   .enter()
      //   .append("circle")
      //   .attr("cy", d => yScale(yValue3(d)))
      //   .attr("cx", d => xScale(xValue(d)))
      //   .attr("class", classes.circle)
      //   .attr("r", 5);

      // g.selectAll("circle")
      //   .data(data)
      //   .enter()
      //   .append("circle")
      //   .attr("cy", d => yScale(yValue4(d)))
      //   .attr("cx", d => xScale(xValue(d)))
      //   .attr("class", classes.circle)
      //   .attr("r", 5);

      // const areaGenerator5 = area()
      //   .x(d => xScale(xValue(d)))
      //   .y0(innerHeight)
      //   .y1(d => yScale((d)));
      // //.curve(curveBasis);

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

      // g.append("path")
      //   .attr("class", classes.linepath5)
      //   .attr("d", areaGenerator5(data));

      g.append("text")
        .attr("class", classes.title)
        .attr("y", -10)
        .text(title);
      //brush area generators
      const areaGeneratorBrush1 = area()
        .x(d => xScale2(xValue(d)))
        .y0(180)
        .y1(d => yScale2(yValue1(d)));

      const areaGeneratorBrush2 = area()
        .x(d => xScale2(xValue(d)))
        .y0(180)
        .y1(d => yScale2(yValue2(d)));

      const areaGeneratorBrush3 = area()
        .x(d => xScale2(xValue(d)))
        .y0(180)
        .y1(d => yScale2(yValue3(d)));

      const areaGeneratorBrush4 = area()
        .x(d => xScale2(xValue(d)))
        .y0(180)
        .y1(d => yScale2(yValue4(d)));

      var context = svg
        .append("g")
        .attr("class", "context")
        .attr("transform", "translate(50," + 600 + ")");
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
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0,180)")
        .call(xAxis2);

      // context
      //   .append("g")
      //   .attr("class", "brush")
      //   .call(brush)
      //   .call(brush.move, xScale.range());
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

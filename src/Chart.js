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
import withStyles from "react-jss";

const styles = {
  yAxis: {
    strokeOpacity: "0.25",
    fontWeight: "bold"
  },
  bar: {
    fill: "#55B1F3"
  },
};
const Chart = ({ classes, data, width, height, margin }) => {

//referencing svg to ref variable
  const barRef = useRef();

  //wrap funtion to wrap xAxis label textOverflow
  var wrap = function() {
    var self = select(this),
      textLength = self.node().getComputedTextLength(),
      text = self.text();
    while (textLength > (50) && text.length > 0) {
      text = text.slice(0, -1);
      self.text(text + '...');
      textLength = self.node().getComputedTextLength();
    }
  };

  //Declaring the entrie code in use effect so that it will be triggered while the page is being loaded
  useEffect(() => {
    //referencing the svg where the chart is to be displayed
    const svg = select(barRef.current)
      .attr("width", width)
      .attr("height", height);

    //creacting a group variable
    var g = svg
      .append("g")
      .attr("transform", "translate(" + 50 + "," + 0 + ")");

    //creating xScale
    const xScale = scaleBand()
      .domain(data.map(d => d.dimBranName))
      .range([0, width - margin])
      .padding(0.2);

    //creating yScale
    const yScale = scaleLinear()
      .domain([0, max(data.map(d => d.value))])
      .range([height - margin, margin]);

    //appending xAxis
    g.append("g")
      .attr("transform", "translate(0," + (height - margin) + ")")
      .call(axisBottom(xScale).tickSize(0))
      .attr("class", "")
      .call(g => g.select(".domain").remove())
      .selectAll("text")
      .attr("transform", "rotate(-60)")
      .attr("dx", "-30px")
      .attr("class", classes.xAxis)
      .each(wrap);

    //appending yAxis
    g.append("g")
      .call(
        axisLeft(yScale)
          .tickFormat(d => {
            return d + "M";
          })
          .ticks(6)
          .tickSizeInner(-width)
      )
      .call(g => g.select(".domain").remove())
      .attr("class", classes.yAxis);

    //Adding the rectangle for bar graphs
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", classes.bar)
      .attr("x", d => xScale(d.dimBranName))
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(0) - yScale(d.value));
  }, [data]);

  //returning svg component
  return (
    <svg width="100%" height="100%" ref={barRef}>
      {" "}
    </svg>
  );
};

export default withStyles(styles)(Chart);

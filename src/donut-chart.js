import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";
import Arc from "./arc";
import LegendItem from "./legend-item";

const style = {
  wholeContainer: {
    margin: "20px"
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    margin: "10px 10px 10px 10px"
  },
  groupVar: {
    position: "relative",
    margin: "10px 10px 10px 10px"
  },
  label: {
    position: "absolute",
    top: "115px",
    left: "100px",
    fontWeight: 750,
    fontSize: "26px"
  },
  svgVar: {
    width: "300px",
    height: "350px"
  },
  legendContainer: {
    position: "absolute",
    left: "270px"
  },
  title: {
    fontWeight: 750,
    fontSize: "26px"
  }
};

const DonutChart = ({
  classes,
  innerRadius,
  outerRadius,
  data,
  title,
  colors
}) => {
  var pie = d3.pie().value(d => d.value)(data);
  var translate = `translate(130,130)`;
  var total = 0;
  return (
    <div className={classes.wholeContainer}>
      <div className={classes.title}>{title}</div>
      <div className={classes.contentContainer}>
        <div className={classes.groupVar}>
          <svg className={classes.svgVar}>
            <g transform={translate}>
              {pie.map((d, i) => {
                total = total + d.newValue;
                return (
                  <Arc
                    key={`arc-${i}`}
                    data={d}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    color={colors[i]}
                    total={total}
                  />
                );
              })}
            </g>
          </svg>
          <div className={classes.label}>
            {total > 1000 ? (total / 1000).toFixed(2) + "k" : total}
          </div>
        </div>
        <div className={classes.legendContainer}>
          {pie.map((d, i) => {
            return (
              <LegendItem key={`legend-${i}`} data={d} color={colors[i]} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default withStyles(style)(DonutChart);

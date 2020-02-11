import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";
import Arc from "./arc";
import LegendItem from "./legend-item";

const style = {
  wholeContainer: {
    margin: "2% 0 0 2%"
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative"
  },
  groupVar: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    margin: "1%"
  },
  label: {
    position: "absolute",
    top: "75%",
    left: "22%",
    fontWeight: 750,
    fontSize: "26px"
  },
  svgVar: {
    width: "100%",
    height: "160%",
    marginLeft: "-10%"
  },
  legendContainer: {
    position: "absolute",
    left: "60%"
  },
  title: {
    fontWeight: 750,
    fontSize: "26px"
  }
};
const legendData = [
  {
    type: "Unauthenticated",
    value: 4800,
    oldValue: 2600
  },
  {
    type: "Authenticated",
    value: 420,
    oldValue: 1600
  },
  {
    type: "Self Authenticated ",
    value: 3705
  }
];

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
      <div className={classes.contentContainer}>
        <div className={classes.groupVar}>
          <svg className={classes.svgVar}>
            <g transform={translate}>
              {pie.map((d, i) => {
                total = total + d.value;
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
          <div className={classes.legendContainer}>
            {legendData.map((d, i) => {
              return (
                <LegendItem key={`legend-${i}`} data={d} color={colors[i]} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(style)(DonutChart);

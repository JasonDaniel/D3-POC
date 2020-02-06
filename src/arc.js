import React from "react";
import * as d3 from "d3";
import withStyles from "react-jss";

const styles = {
  path: {
    width: "100px",
    height: "300px"
  }
};
const Arc = ({ classes, innerRadius, outerRadius, data, color, total }) => {
  const arc = d3
    .arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);
  console.log(total);
  return (
    <>
      <path
        className={classes.path}
        d={arc(data)}
        style={{ fill: color }}
      ></path>
    </>
  );
};

export default withStyles(styles)(Arc);

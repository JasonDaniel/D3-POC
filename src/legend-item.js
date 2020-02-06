import React from "react";
import * as d3 from "d3";
import withStyles from "react-jss";
import Variance from "./variance";
import downArrow from "./down-arrow.png";
import upArrow from "./up-arrow.png";
const styles = {
  legendContainer: {
    display: "flex",
    flexDoirection: "row",
    padding: "10px",
    margin: "10px 10px 10px 40px"
  },
  legendBlock: {
    height: "61px",
    width: "10px"
    //background: "black"
  },
  legendTextContainer: {
    marginLeft: "10px"
  },
  value: {
    fontWeight: "750",
    fontSize: "14px",
    paddingBottom: "2px"
  },
  type: {
    fontSize: "12px",
    paddingBottom: "2px"
  }
};
const LegendItem = ({ classes, color, data }) => {
  console.log(data.variance);
  return (
    <div className={classes.legendContainer}>
      <div className={classes.legendBlock} style={{ background: color }} />
      <div className={classes.legendTextContainer}>
        <div className={classes.type}>{data.data.type}</div>
        <div className={classes.value}>
          {data.data.newValue > 1000
            ? (data.data.newValue / 1000).toFixed(1) + "k"
            : data.data.newValue}
        </div>
        <Variance data={data} />
      </div>
    </div>
  );
};
export default withStyles(styles)(LegendItem);

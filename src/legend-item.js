import React from "react";
import withStyles from "react-jss";
import Variance from "./variance";
const styles = {
  legendContainer: {
    display: "flex",
    flexDoirection: "row",
    padding: "10px",
    margin: "10px 10px 10px 20px"
  },
  legendBlock: {
    width: "10px"
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
  return (
    <div className={classes.legendContainer}>
      <div className={classes.legendBlock} style={{ background: color }} />
      <div className={classes.legendTextContainer}>
        <div className={classes.type}>{data.type}</div>
        <div className={classes.value}>
          {data.value > 1000
            ? (data.value / 1000).toFixed(1) + "k"
            : data.value}
        </div>
        <Variance newValue={data.value} oldValue={data.oldValue} />
      </div>
    </div>
  );
};
export default withStyles(styles)(LegendItem);

import React from "react";
import withStyles from "react-jss";
import { ResponsiveBullet } from "@nivo/bullet";

const styles = {
  bullet: {
    height: "500px",
    width: "600px"
  }
};
const data = [
  {
    id: "temp.",
    ranges: [94, 35, 54, 0, 140],
    measures: [87],
    markers: [119]
  },
  {
    id: "power",
    ranges: [
      1.2154816794210075,
      0.028903311427126193,
      1.9314262286155217,
      0,
      2
    ],
    measures: [0.215166868307429, 0.2196357046755817],
    markers: [1.7484516417008242]
  },
  {
    id: "volume",
    ranges: [36, 0, 1, 41, 7, 8, 0, 60],
    measures: [51],
    markers: [43]
  },
  {
    id: "cost",
    ranges: [247376, 4691, 444596, 0, 500000],
    measures: [17449, 25225],
    markers: [438658]
  },
  {
    id: "revenue",
    ranges: [5, 0, 6, 0, 9],
    measures: [3],
    markers: [7.790556083373893, 8.273247619199655]
  }
];

const BulletChart = ({ classes }) => {
  return (
    <div className={classes.bullet}>
      <ResponsiveBullet
        data={data}
        margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
        spacing={46}
        titleAlign="start"
        titleOffsetX={-70}
        measureSize={0.2}
        animate={true}
        motionStiffness={90}
        motionDamping={12}
      />
    </div>
  );
};

export default withStyles(styles)(BulletChart);

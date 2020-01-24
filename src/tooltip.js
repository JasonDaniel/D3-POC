import React from "react";
import withStyles from "react-jss";
import dateFormat from "dateformat";

const style = {
  title: {
    position: "absolute",
    top: "20px",
    left: "200px"
  },
  showTooltip: {
    position: "absolute",
    top: "20px",
    left: "800px",
    background: "#23dced",
    borderStyle: "solid",
    borderWidth: "2px",
    padding: "20px",
    marginRight: "20px",
    borderRadius: "5px",
    transition: "width 5s"
  },
  hideTooltip: {
    display: "none"
  }
};
function Tooltip({ data, classes, tooltipDisplay, title }) {
  var date = dateFormat(data.Date, "mmm d,yyyy");
  return (
    <div>
      <h1 className={classes.title}>{title}</h1>
      <div
        className={
          tooltipDisplay === "true" ? classes.showTooltip : classes.hideTooltip
        }
      >
        <div>
          <b>Date:</b>
          {date}
        </div>
        <div>
          <b>Page views on this day: </b>
          {data.page_views}
        </div>
        <div>
          <b>Most contributed article: </b>
          {data.hits_page_pagetitle}
        </div>
      </div>
    </div>
  );
}

export default withStyles(style)(Tooltip);

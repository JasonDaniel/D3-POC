import React from "react";
import withStyles from "react-jss";
import dateFormat from "dateformat";

const style = {
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
function Tooltip({ data, classes, tooltipDisplay }) {
  var date = dateFormat(data.Date, "mmm d,yyyy");
  console.log(tooltipDisplay);
  if (date) {
    return (
      <div
        className={
          tooltipDisplay === "true" ? classes.showTooltip : classes.hideTooltip
        }
      >
        <div>Date:{date}</div>
        <div>Page views on this day: {data.page_views}</div>
        <div>Most contributed article: {data.hits_page_pagetitle}</div>
      </div>
    );
  } else return null;
}

export default withStyles(style)(Tooltip);

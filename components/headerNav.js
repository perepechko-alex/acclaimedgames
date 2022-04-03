import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    backgroundColor: "#333",
    "& li": {
      float: "left",
      "& a": {
        display: "block",
        color: "white",
        textAlign: "center",
        padding: "14px 16px",
        textDecoration: "none",
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      "& a:hover": {
        backgroundColor: "#111",
      },
    },
  },
});

export default function HeaderNavigation() {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      <li>
        <a href="../">Home</a>
      </li>
    </ul>
  );
}

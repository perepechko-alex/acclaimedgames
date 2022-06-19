import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    bottom: "0",
    width: "29%",
    height: "70px",
    backgroundColor: "transparent",
    textAlign: "center",
    "& li": {
      float: "left",
      "& a": {
        display: "block",
        color: "grey",
        textAlign: "center",
        padding: "14px 16px",
        textDecoration: "none",
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      "& a:hover": {
        backgroundColor: "#ddd",
      },
    },
  },
});

export default function Footer() {
  const classes = useStyles();
  const display = { display: "inline-block" };
  return (
    <ul className={classes.root}>
      <li style={display}>
        <a href="../">Home</a>
      </li>
      <li style={display}>
        <a href="../about">About</a>
      </li>
    </ul>
  );
}

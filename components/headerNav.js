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
        fontFamily: "Helvetica",
      },
      "& a:hover": {
        backgroundColor: "#111",
      },
    },
  },
});

export default function HeaderNavigation() {
  const classes = useStyles();
  const display = { display: "inline-block" };
  return (
    <ul className={classes.root}>
      <li style={display}>
        <a href="../">Home</a>
      </li>
      <li style={display}>
        <a href={process.env.APP_ENV === "dev" ? "../formulas" : "../formulas.html"}>Formulas</a>
      </li>
      <li style={display}>
        <a href={process.env.APP_ENV === "dev" ? "../about" : "../about.html"}>About</a>
      </li>
    </ul>
  );
}

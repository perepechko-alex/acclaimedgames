import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FaGitlab, FaTwitter } from "react-icons/fa";

const useStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
    textAlign: "center",
    gridRowStart: "2",
    gridRowEnd: "3",
    "& li": {
      float: "center",
      "& a": {
        display: "block",
        color: "grey",
        textAlign: "center",
        padding: "8px 10px",
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
        <a href="https://gitlab.com/perepechko.alex" title="Gitlab">
          <FaGitlab />
        </a>
      </li>
      <li style={display}>
        <a href={"https://twitter.com/alxexperience"} title="Twitter">
          <FaTwitter />
        </a>
      </li>
    </ul>
  );
}

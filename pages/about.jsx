import * as React from "react";
import { Container } from "@material-ui/core";
import HeaderNavigation from "../components/headerNav";
import Footer from "../components/footer";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  body: {
    minHeight: "100%",
    display: "grid",
    gridTemplateRows: "1fr auto",
    fontFamily: "Helvetica Neue",
  },
});
export default function About() {
  const classes = useStyles();
  return (
    <>
      <HeaderNavigation />
      <div className={classes.body}>
        <Container maxWidth="sm">
          <p>
            Welcome to the website! This project aims to determine the most critically acclaimed videogames of all time,
            based on critic lists.
          </p>
          <h2>What lists are qualified to appear?</h2>
          <p>
            Game of the Year and Greatest Game of All Time lists of all kinds are included as long as there is some sort
            of editorial staff involved. Fan lists and individual contributor lists are disqualified and not included.
          </p>
          <p>
            In the future, I plan on adding other lists such as Game of the Decade and Greatest Games for X Platform.
          </p>
          <h2>What is the reasoning behind the numbers in your formulas?</h2>
          <p>
            First note -- I am not a data scientist or analyst, so the formulas are base on what I believe are fair.
            They are subject to change in the future.
          </p>
          <p>
            Formulas can be found&nbsp;
            <a href={process.env.APP_ENV === "dev" ? "../formulas" : "../formulas.html"}>on the page here</a>.
          </p>
          <p>Some general notes and insights into my thinking: </p>
          <ul>
            <li>The base score for game on a GOAT list is worth twice as much as that of a GOTY winner</li>
            <li>
              The older a list is from the current year, the less points are added. This is because a game from say,
              1997 has to compete against a universe of smaller games than a game on a 2017 list. Games from within the
              last 10 years are weighed more heavily and worth more than games on lists > 10 years ago. This is a large
              reason for having a points-based system.
            </li>
            <li>Additional points are based on a percentage of where the game is ranked.</li>
            <li>
              An Unranked GOAT is similar to a ranked GOAT, but the ranking is not taken into account due to its lack of
              existence.
            </li>
            <li>
              An Unranked GOTY list will have all the games inherit the default GOTY value of 0.9, because there is no
              hierarchy. Therefore, the games are presumed to be ranked equally.
            </li>
          </ul>
          <h2>
            I noticed an issue issue in your list, have questions, or want to leave a comment. How can I reach out?
          </h2>
          <p>
            Feel free to email me at <a href="mailto:greatestgamesofalltime@pm.me">greatestgamesofalltime@pm.me</a>, or
            reach out to me via DM/Tweet on <a href="https://twitter.com/alxexperience">Twitter</a>. Also feel free to
            leave an issue or request on the <a href="https://gitlab.com/perepechko.alex/acclaimedgames">Gitlab repo</a>
            !
          </p>
        </Container>
      </div>
      <Footer />
    </>
  );
}

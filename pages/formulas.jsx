import * as React from "react";
import { Container } from "@material-ui/core";
import HeaderNavigation from "../components/headerNav";
import Footer from "../components/footer";
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";

export default function Formulas() {
  return (
    <>
      <HeaderNavigation />
      <Container maxWidth="sm">
        <h2>Base Values</h2>
        <p>
          <TeX math={`DATE_{diff} = {CURRENT_{date} - LIST_{date}}`} />
        </p>
        <p>
          <TeX math={`DATE_{points} = \\frac{DATE_{diff}}{10}`} />
        </p>
        <p>
          <TeX math={`BASE_{goat} = 2`} />
        </p>
        <p>
          <TeX math={`BASE_{goty} = 0.9`} />
        </p>
        <br />
        <h2>GOAT (Ranked)</h2>
        <h3> List is within the last 10 years</h3>
        <p>
          If the game is not ranked 1: <br />
          <br />
          &emsp;
          <TeX math={`POINTS = BASE_{goat} + (1 -  DATE_{points}) + \\frac{1}{RANK}`} />
        </p>
        <p>
          If the game is ranked #1: <br /> <br />
          &emsp;
          <TeX math={`POINTS = BASE_{goat} + (2 - DATE_{points})`} />
        </p>
        <h3>List is > 10 years</h3>
        <p>
          If the game is not ranked #1: <br />
          <br />
          &emsp;
          <TeX math={`POINTS = BASE_{goat} + (\\frac{1}{RANK} * \\frac{1}{DATE_{diff}})`} />
        </p>
        <p>
          If the game is ranked 1: <br /> <br />
          &emsp;
          <TeX math={`POINTS = BASE_{goat} + \\frac{1}{DATE_{diff}}`} />
        </p>
        <h2>GOAT (Unranked)</h2>
        <p>
          List is within the last 10 years: <br />
          <br />
          &emsp;
          <TeX math={`POINTS = BASE_{goat} + (1 - DATE_{points})`} />
        </p>
        <p>
          List is > 10 years: <br /> <br />
          &emsp;
          <TeX math={`POINTS = BASE_{goat} + \\frac{1}{{DATE_{diff}}^2}`} />
        </p>
        <br />
        <h2>GOTY (Ranked)</h2>
        <p>
          If the game is not ranked #1: <br /> <br />
          &emsp;
          <TeX math={`POINTS = BASE_{goty} + {\\frac{1}{RANK * 10}}`} />
        </p>
        <p>
          If the game is ranked #1: <br /> <br />
          &emsp;
          <TeX math={`POINTS = 1`} />
        </p>
        <h2>GOTY (Unranked)</h2>
        <p>
          &emsp;
          <TeX math={`POINTS = BASE_{goty}`} />
        </p>
      </Container>
      {/*<Footer />*/}
    </>
  );
}

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
  },
});
export default function About() {
  const classes = useStyles();
  return (
    <>
      <HeaderNavigation />
      <div className={classes.body}>
        <Container maxWidth="sm">
          <p>Welcome to the website!</p>
        </Container>
      </div>
      <Footer />
    </>
  );
}

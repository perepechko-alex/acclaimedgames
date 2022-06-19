import * as React from "react";
import { Container } from "@material-ui/core";
import HeaderNavigation from "../components/headerNav";
import Footer from "../components/footer";
export default function About() {
  return (
    <>
      <HeaderNavigation />
      <Container maxWidth="sm">
        <p>hi test</p>
      </Container>
      {/*<Footer />*/}
    </>
  );
}

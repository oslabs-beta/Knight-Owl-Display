// Key helper function imports for future use.
import { Container, Grid } from "@mui/material";
import React from "react";
import '../app.css';

// Component imports
import Features from "./Features.jsx";
import Hero from "./Hero.jsx";
import NavBar from "./Nav.jsx";
import Problem from "./Problem.jsx";
import Team from "./Team.jsx";
import CodingPlayground from "./CodingPlayground.jsx";

function App() {
  
    return (
      <div className="container-sg">
        <Container maxWidth="lg">
          <Grid 
          container
          direction="column"
          justify="center"
          alignItems="center">
            <Grid item xs={12}>
              <NavBar/>
            </Grid>
            <Grid item xs={12}>
              <Hero/>
              <Problem/>
              <Features/>
            </Grid>
            <Grid item xs={12}>
              <CodingPlayground/>
            </Grid>
            <Grid item xs={12}>
              <Team/>
            </Grid>
            <Grid item xs={12}>
              <NavBar/>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
};

export default App;
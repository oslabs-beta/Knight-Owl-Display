// Key helper function imports for future use.
import { Container, Grid } from "@mui/material";
import React from "react";
import '../app.css';
import '../hero.css';

// Component imports
import Features from "./Features.jsx";
import Hero from "./Hero.jsx";
import NavBar from "./Nav.jsx";
import Problem from "./Problem.jsx";
import Team from "./Team.jsx";
import TechStack from "./TechStack.jsx";
import Dashboard from "./Dashbord.jsx";

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
              <div className="techstack-header-sg">Knight Owl Tech Stack</div>
              <TechStack/>
              <Team/>
            </Grid>
            <Grid item xs={12}>
              <NavBar/>
            </Grid>
          </Grid>
        </Container>
        {/* Uncomment out the dashboard container below to add React components within it and have it rendered on the landing page. */}
        <Dashboard/>
      </div>
    )
};

export default App;
import React from "react";
import {Link} from 'react-router-dom'
import { Container, Grid } from "@mui/material";
import '../app.css';
import '../styles/hero.css';
import '../styles/problem.css';
import '../styles/features.css';
import '../styles/dashboard.css';
import '../styles/techStack.css';
import '../styles/team.css';

import Features from "../components/Features.jsx";
import Hero from "../components/Hero.jsx";
import NavBar from "../components/Nav.jsx";
import Problem from "../components/Problem.jsx";
import Team from "../components/Team.jsx";
import TechStack from "../components/TechStack.jsx";
import Dashboard from "../components/Dashbord.jsx";

import DashPage from './dashPage.jsx';

function Home(props) {
  
  return (
    <>
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
            <Link to={'dashboard'}>Dashboard</Link>
            <TechStack/>
            {/* <Team/> */}
          </Grid>
          <Grid item xs={12}>
            <NavBar/>
          </Grid>
        </Grid>
      </Container>
      {/* Uncomment out the dashboard container below to add React components within it and have it rendered on the landing page. */}
      {/* <Dashboard/> */}
    </div>
    </>
  )
};

export default Home;
// Key helper function imports for future use.
import { Container, Grid } from "@mui/material";
import React from "react";
import '../app.css';
import '../styles/hero.css';
import '../styles/problem.css';
import '../styles/features.css';
import '../styles/dashboard.css';
import '../styles/techStack.css';
import '../styles/team.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Component imports
import Features from "./Features.jsx";
import Hero from "./Hero.jsx";
import NavBar from "./Nav.jsx";
import Problem from "./Problem.jsx";
import Team from "./Team.jsx";
import TechStack from "./TechStack.jsx";
import Dashboard from "./Dashbord.jsx";
import Home from '../routes/home.jsx'
import DashPage from "../routes/dashPage.jsx";
import About from "../routes/about.jsx";
import NotFound from '../routes/notFound.jsx'

function App() {
  
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<DashPage />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      // <div className="container-sg">
      //   <Container maxWidth="lg">
      //     <Grid 
      //     container
      //     direction="column"
      //     justify="center"
      //     alignItems="center">
      //       <Grid item xs={12}>
      //         <NavBar/>
      //       </Grid>
      //       <Grid item xs={12}>
      //         <Hero/>
      //         <Problem/>
      //         <Features/>
      //       </Grid>
      //       <Grid item xs={12}>
      //         <TechStack/>
      //         <Team/>
      //       </Grid>
      //       <Grid item xs={12}>
      //         <NavBar/>
      //       </Grid>
      //     </Grid>
      //   </Container>
      //   {/* Uncomment out the dashboard container below to add React components within it and have it rendered on the landing page. */}
      //   {/* <Dashboard/> */}
      // </div>
    )
};

export default App;
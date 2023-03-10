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
import '../styles/auth.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Component imports
import Features from "./Features.jsx";
import Hero from "./Hero.jsx";
import NavBar from "./Nav.jsx";
import Problem from "./Problem.jsx";
import Team from "./Team.jsx";
import TechStack from "./TechStack.jsx";
import Dashboard from "./Dashboard.jsx";
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
    )
};

export default App;
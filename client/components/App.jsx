// Key helper function imports for future use.
import { Container, Grid } from "@mui/material";
import React from "react";
import Hero from "./Hero.jsx";

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
              {/* Navbar Component */}
            </Grid>
            <Grid item xs={12}>
              <Hero />
            </Grid>
            <Grid item xs={12}>
              {/* Body Component */}
            </Grid>
            <Grid item xs={12}>
              {/* Footer Component */}
            </Grid>
          </Grid>
        </Container>
      </div>
    )
};

export default App;
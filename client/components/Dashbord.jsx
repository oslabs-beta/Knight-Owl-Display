import React from 'react';
import { Grid } from "@mui/material";
import '../dashboard.css';
import { LineGraph } from './Graph.jsx';

export default function Dashboard() {
  return (
    <Grid item xs={12} className='full-dash' >
        <h1>Dashboard</h1>
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center">
          <Grid item xs={3}>
            {/* Insert dashboard component here */}
          </Grid>
          <Grid item xs={3}>
             <LineGraph></LineGraph>
          </Grid>
          <Grid item xs={3}>
             {/* Insert dashboard component here */}
          </Grid>
      </Grid>
      </Grid>
  )
};
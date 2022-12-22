import React from 'react';
import { Grid } from "@mui/material";
import '../dashboard.css';
import BarChart from './BarChart.jsx';

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
            <BarChart />
          </Grid>
          <Grid item xs={3}>
             <BarChart />
          </Grid>
          <Grid item xs={3}>
             {/* Insert dashboard component here */}
             <BarChart />
          </Grid>
      </Grid>
      </Grid>
  )
};
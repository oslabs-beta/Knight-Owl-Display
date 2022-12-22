import React from 'react';
import { Grid } from "@mui/material";

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
            <h1>Hi</h1>
          </Grid>
          <Grid item xs={3}>
             {/* Insert dashboard component here */}
             <h1>I'm</h1>
          </Grid>
          <Grid item xs={3}>
             {/* Insert dashboard component here */}
             <h1>Jackon</h1>
          </Grid>
      </Grid>
      </Grid>
  )
};
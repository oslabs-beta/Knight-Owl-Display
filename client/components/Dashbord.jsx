import React from 'react';
import { Grid } from "@mui/material";
import BarChart from './BarChart.jsx';
import LineChartEx from './LineChartEx.jsx';
import { LineGraph } from './Graph.jsx';
import QueryLog from './QueryLog.jsx';

export default function Dashboard() {
  return (
      <Grid
        container
        spacing={3}
        className='full-dash'
        direction="row"
        flexWrap="nowrap"
        justify="center"
        >
          <Grid item xs={7} >
            <h1>Query History</h1>
            <QueryLog />
          </Grid>

          <Grid item xs={5}>
            <h1>KO'd Queries Over Time</h1>
            <Grid
             container
             maxWidth="lg"
             className='full-dash'
             direction="column"
             flexWrap="nowrap"
             justify="center"
            >

              <Grid item xs={12} >
                <LineChartEx />
              </Grid>
              <Grid item xs={12}>
                {/* Insert dashboard component here */}
                <BarChart />
              </Grid>
              <Grid item xs={12}>
                <LineGraph></LineGraph>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
  )
};
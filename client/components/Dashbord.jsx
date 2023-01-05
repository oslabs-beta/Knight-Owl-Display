import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import BarChart from './BarChart.jsx';
import LineChartEx from './LineChartEx.jsx';
import { LineGraph } from './Graph.jsx';
import QueryLog from './QueryLog.jsx';
import axios from 'axios';
import { PieChart } from './PieChart.jsx';

export default function Dashboard() {

  const [ data, setData ] = useState( { queries: [] } );

  useEffect(() => {
    const GET_QUERIES = `
    query {
        userQueries(id: 1) {
          query_id
          querier_ip_address
          query_string
          rejected_by
          rejected_on
          user_id
        }
      }`;

    const fetchQueries = async () => {
      // Call the GraphQL API with the given query string for all bad queries.
      const queryResult = await axios.post(
        'http://localhost:8080/graphql', {
          query: GET_QUERIES
      });
      // Update the state to hold all the bad queries related to the specific user profile.
      const fetchedQueryData = queryResult.data.data;
      setData({ queries: fetchedQueryData.userQueries })
    };

    fetchQueries();
  }, data);

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
                <PieChart />
              </Grid>
              <Grid item xs={12}>
                {/* Insert dashboard component here */}
                {console.log(data)}
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
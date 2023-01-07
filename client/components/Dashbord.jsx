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
  const [ fetchStatus, setFetchStatus ] = useState( { fetching: true } );

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
        '/graphql', {
          query: GET_QUERIES
      }).then(response => {
        // Update the state to hold all the bad queries related to the specific user profile.
        const fetchedQueryData = response.data.data;
        // Change the state once the fetch returns.
        setData({ queries: fetchedQueryData.userQueries })
        // Set a loading status during the fetch/completion of the fetch.
        setFetchStatus( { fetching: false } );
      })
    };
    fetchQueries();
  }, []);

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
            <QueryLog queryData={!fetchStatus.fetching ? data : [{queries: {
              querier_ip_address: 'Loading',
              query_string: 'Loading',
              rejected_by: 'Loading',
              rejected_on: 'Loading'
            }}]}/>
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
                <PieChart queryData={data}/>
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
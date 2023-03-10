import React, { useEffect, useState} from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";
import { LineGraph } from './Graph.jsx';
import QueryLog from './QueryLog.jsx';
import axios from 'axios';
import { PieChart } from './PieChart.jsx';
import owlUpsideDown from '../../docs/assets/upsideDownOwl.png';

export default function Dashboard(props) {

  const [ data, setData ] = useState( { queries: [] } );
  const [ fetchStatus, setFetchStatus ] = useState( { fetching: true } );
  const [ signedIn, setSignedIn ] = useState({signedIn: ""});
  const navigate = useNavigate();

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
        setSignedIn({signedIn: response.headers.signedin});
        // Update the state to hold all the bad queries related to the specific user profile.
        // console.log('signin state: ', 'test')
        const fetchedQueryData = response.data.data;
        // Change the state once the fetch returns.
        setData({ queries: fetchedQueryData.userQueries })
        // Set a loading status during the fetch/completion of the fetch.
        setFetchStatus( { fetching: false } );
      })
    };
    fetchQueries();
  }, []);

  return (<>
    {signedIn.signedIn === "false" && 
    <Navigate to={'/'} replace={'true'} />}
    
    <Grid
      container
      direction='column'
      className='full-dash'
      flexWrap='wrap'
    >
      <Grid item xs={12} md={12}>
      <div style={{display:'flex', justifyContent:'center'}}>
        <img className='hidden-owl' src={owlUpsideDown} style={{height: '45px'}}/>
      </div>

      </Grid>
      <Grid item xs={12} md={12}>
        <h1>Hi, Welcome Back</h1>
      </Grid>
      <Grid
        container
        spacing={3}
        direction="column"
        flexWrap="nowrap"
        justify="center"
        >
          <Grid item xs={12} md={12}>
            <Grid
              container
              direction="row"
              flexWrap="wrap"
              justify="center"
            >
              <Grid item xs={12} md={4.5}>
                <PieChart queryData={data}/>
              </Grid>
              <Grid item xs={12} md={7.5} className='linegraph'>
                <LineGraph queryData={data}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={7} >
            <QueryLog queryData={!fetchStatus.fetching ? data : [{queries: {
              querier_ip_address: 'Loading',
              query_string: 'Loading',
              rejected_by: 'Loading',
              rejected_on: 'Loading'
            }}]}/>
          </Grid>
      </Grid>
    </Grid>
  </>)
};
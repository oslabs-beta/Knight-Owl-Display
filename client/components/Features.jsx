import React from 'react'
import { Container, Grid } from "@mui/material";

export default function Features() {
  
  return (
    <div className='features-sg'>
      <div className='features-header-sg'>
        KnightOwl is here to protect everything you love about GraphQL.
      </div>
      <Grid 
          container
          direction="row"
          justify="center"
      >
        <Grid item xs={12} md={4}>
        <div className='features-point-sg'>
          <h2 className='features-point-title-sg'>Cost Analysis</h2>
          <p className='features-desc-sg'>Set data consumption limits and ensure clear control over how expensive a query is.</p>
        </div>
        </Grid>
        <Grid item xs={12} md={4}>
        <div className='features-point-sg'>
          <h2 className='features-point-title-sg'>Depth Limiting</h2>
          <p className='features-desc-sg'>Restrict queries based on their depth. Prevent DoS attacks specific to nested queries by setting strict parameters that all queries will have to be validated by.</p>
        </div>
        </Grid>
         <Grid item xs={12} md={4}>
        <div className='features-point-sg'>
          <h2 className='features-point-title-sg'>Rate Limiting</h2>
          <p className='features-desc-sg'>Set contraints to limit incoming traffic to prevent an abrupt high frequency volume of queries.</p>
        </div>
        </Grid>
      </Grid>
    </div>
  )
}

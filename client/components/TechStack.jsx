import React from 'react';
import { Grid } from "@mui/material";

// Headshot images imported.
import redis from '../../docs/assets/redis-logo.png';
import js from '../../docs/assets/js-logo.png';
import node from '../../docs/assets/node-logo.png';
import postgresql from '../../docs/assets/postgresql-logo.png';
import react from '../../docs/assets/react-logo.png';
import graphql from '../../docs/assets/graphql-logo.png';
import materialui from '../../docs/assets/materialui-logo.png';
import sequelize from '../../docs/assets/sequelize-logo.png';

export default function Team() {
  return (
    <div className='tech-container-sg'>
      <p className='tech-title-sg'>Knight Owl Tech Stack</p>
      <Grid 
          container
          direction="row"
          justify="center"
          alignItems="center"
      >
        <Grid item xs={4} align="center">
        <div className='tech-sg'>
          <img src={graphql} className="tech-logo" style={{maxWidth: "250px", maxHeight: "200px"}}/>
        </div>
        </Grid>
        <Grid item xs={4} align="center">
        <div className='tech-sg'>
          <img src={redis} className="tech-logo" style={{maxWidth: "300px", maxHeight: "200px"}}/>
        </div>
        </Grid>
        <Grid item xs={4} align="center">
        <div className='tech-sg'>
          <img src={node} className="tech-logo" style={{maxWidth: "150px", maxHeight: "200px"}}/>
        </div>
        </Grid>
        <Grid item xs={4} align="center">
        <div className='tech-sg'>
          <img src={postgresql} className="tech-logo" style={{maxWidth: "250px", maxHeight: "300px"}}/>
        </div>
        </Grid>
        <Grid item xs={4} align="center">
        <div className='tech-sg'>
          <img src={materialui} className="tech-logo" style={{maxWidth: "250px", maxHeight: "300px"}}/>
        </div>
        </Grid>
        <Grid item xs={4} align="center">
        <div className='tech-sg'>
          <img src={react} className="tech-logo" style={{maxWidth: "200px", maxHeight: "200px"}}/>
        </div>
        </Grid>
        <Grid item xs={4} align="center">
        <div className='tech-sg'>
          <img src={sequelize} className="tech-logo" style={{maxWidth: "100px", maxHeight: "100px"}}/>
        </div>
        </Grid>
        <Grid item xs={4} align="center">
        <div className='tech-sg'>
          <img src={js} className="tech-logo" style={{maxWidth: "100px", maxHeight: "100px"}}/>
        </div>
        </Grid>
      </Grid>
    </div>
  )
}

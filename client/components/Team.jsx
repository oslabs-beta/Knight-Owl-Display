import React from 'react';
import { Grid } from "@mui/material";

// Headshot images imported.
import caitlinHeadshot from '../../docs/assets/caitlin-headshot.JPG';
import jacksonHeadshot from '../../docs/assets/jackson-headshot.jpg';
import onaHeadshot from '../../docs/assets/ona-headshot.png';
import simonHeadshot from '../../docs/assets/simon-headshot.jpg';

export default function Team() {
  return (
    <div className='team-container-sg'>
      <Grid 
          container
          direction="row"
      >
        <Grid item xs={6}>
        <div className='team-sg'>
          <img src={caitlinHeadshot} className="team-headshot"/>
          <h2 className='team-name-sg'>Caitlin Ervine</h2>
          <p className='team-bio-sg'>Insert bio here.</p>
        </div>
        </Grid>
        <Grid item xs={6}>
        <div className='team-sg'>
          <img src={jacksonHeadshot} className="team-headshot"/>
          <h2 className='team-name-sg'>Jackson Kalmbach</h2>
          <p className='team-bio-sg'>Insert bio here.</p>
        </div>
        </Grid>
        <Grid item xs={6}>
        <div className='team-sg'>
          <img src={onaHeadshot} className="team-headshot"/>
          <h2 className='team-name-sg'>Ona Narbutas</h2>
          <p className='team-bio-sg'>Insert bio here.</p>
        </div>
        </Grid>
        <Grid item xs={6}>
        <div className='team-sg'>
          <img src={simonHeadshot} className="team-headshot"/>
          <h2 className='team-name-sg'>Simon Grigenas</h2>
          <p className='team-bio-sg'>Insert bio here.</p>
        </div>
        </Grid>
      </Grid>
    </div>
  )
}

import React from 'react';
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';

// Headshot images imported.
import caitlinHeadshot from '../../docs/assets/caitlin-headshot.jpg';
import jacksonHeadshot from '../../docs/assets/jackson-headshot.jpg';
import onaHeadshot from '../../docs/assets/ona-headshot.png';
import simonHeadshot from '../../docs/assets/simon-headshot.jpg';


export default function Team() {
  return (
    <div className='team-container-sg'>
      <p className='team-title-sg'>The Team Behind Protecting Your Queries</p>
      <Grid 
          container
          direction="row"
      >
        <Grid item xs={6}>
        <div className='team-sg'>
          <img src={caitlinHeadshot} className="team-headshot"/>
          <h2 className='team-name-sg'>Caitlin Ervine</h2>
          <div className='team-buttons-ce'>
            <Button
            className='linkedin-button-ce'
            target='_blank' 
            href='https://www.linkedin.com/in/caitlin-ervine/'
            startIcon={<LinkedInIcon/>}
            >
            </Button>
            <Button
            className='github-button-ce'
            target='_blank' 
            href='https://github.com/caitlinme24'
            startIcon={<GitHub/>}
            ></Button>
          </div>
        </div>
        </Grid>
        <Grid item xs={6}>
        <div className='team-sg'>
          <img src={jacksonHeadshot} className="team-headshot"/>
          <h2 className='team-name-sg'>Jackson Kalmbach</h2>
          <div className='team-buttons-ce'>
            <Button
            className='linkedin-button-ce'
            target='_blank' 
            href='https://www.linkedin.com/in/jacksonkalmbach/'
            startIcon={<LinkedInIcon/>}
            >
            </Button>
            <Button
            className='github-button-ce'
            target='_blank' 
            href='https://github.com/jacksonkalmbach'
            startIcon={<GitHub/>}
            ></Button>
          </div>
        </div>
        </Grid>
        <Grid item xs={6}>
        <div className='team-sg'>
          <img src={onaHeadshot} className="team-headshot"/>
          <h2 className='team-name-sg'>Ona Narbutas</h2>
          <div className='team-buttons-ce'>
            <Button
            className='linkedin-button-ce'
            target='_blank' 
            href='https://www.linkedin.com/in/ona-narbutas/'
            startIcon={<LinkedInIcon/>}
            >
            </Button>
            <Button
            className='github-button-ce'
            target='_blank' 
            href='https://github.com/ona-narbutas'
            startIcon={<GitHub/>}
            ></Button>
          </div>
        </div>
        </Grid>
        <Grid item xs={6}>
        <div className='team-sg'>
          <img src={simonHeadshot} className="team-headshot"/>
          <h2 className='team-name-sg'>Simon Grigenas</h2>
          <div className='team-buttons-ce'>
            <Button
            className='linkedin-button-ce'
            target='_blank' 
            href='https://www.linkedin.com/in/simon-grigenas/'
            startIcon={<LinkedInIcon/>}
            >
            </Button>
            <Button
            className='github-button-ce'
            target='_blank' 
            href='https://github.com/sosasays'
            startIcon={<GitHub/>}
            ></Button>
          </div>
        </div>
        </Grid>
      </Grid>
    </div>
  )
}

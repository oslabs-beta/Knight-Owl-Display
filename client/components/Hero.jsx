import React from 'react';
import owlLogo from '../../docs/assets/KnightOwl.png';
import { Button } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

export default function Hero() {
  return (
    <div className='hero-sg'>
      <img className='hero-logo-sg' src={owlLogo}/>
      <h1 className='hero-tagline-sg'>Give a hoot about protecting your GraphQL queries.</h1>
      <p className='hero-tagline-desc-sg'>An easy way to secure all the GraphQL queries hitting your server. Our NPM package contains pre-built middleware functions to handle depth and rate limiting, as well as cost analysis.</p>
      <div className='hero-install-sg'>
        <span>$ npm i knightowl</span>
      </div>
        <Button
          color="primary"
          size="small"
          variant="contained"
          startIcon={<ImportContactsIcon/>}
        >Install</Button>
    </div>
  )
};

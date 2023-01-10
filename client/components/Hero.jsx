import React from 'react';
import owlLogo from '../../docs/assets/KnightOwl.png';
import { Button } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

export default function Hero() {
  return (
    <div className='hero-sg'>
      <img className='hero-logo-sg' src={owlLogo}/>
      <h1 className='hero-tagline-sg'>Give a hoot about protecting your GraphQL queries.</h1>
      <div className='hero-install-sg'>
        <span className='hero-npm-sg'>npm i knightowl</span><ContentPasteIcon className="hero-npm-paste" onClick={() => {navigator.clipboard.writeText('npm i knightowl')}}/>
      </div>
        <Button
          color="primary"
          style={{
            backgroundColor: "#262626",
            color: "#FFFF"
          }}
          size="small"
          variant="contained"
          startIcon={<ImportContactsIcon/>}
        >Install</Button>
      <p className='hero-tagline-desc-sg'>An easy way to secure all the GraphQL queries hitting your server. Our NPM package contains pre-built middleware functions to handle depth and rate limiting, as well as cost analysis.</p>
    </div>
  )
};

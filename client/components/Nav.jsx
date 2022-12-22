import React, { useState } from 'react';
import { AppBar, Button, IconButton, Stack,  Toolbar, Typography, Dialog } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import owlLogo from '../../docs/assets/KnightOwl.png';

import Auth from './Auth.jsx';


const NavBar = () => {
 // use the useState hook to manage state for whether the user is looking at login/auth fields and conditionally render accordingly
 const [open, toggleAuth] = useState(false) // possible values: true or false


  return (
    <>
      <AppBar>
        <Toolbar style={{
          backgroundColor: "#dfc1ae",
        }}>
          <IconButton>
            <img className='CE-LogoImage' src={owlLogo} width='50' height='50'/>
          </IconButton>
          <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button color='inherit' onClick={()=>toggleAuth(true)}>Sign In</Button>
            <Button color='inherit'>About The Team</Button>
            <Button color='inherit'>NPM</Button>
            <IconButton>
              <GitHubIcon/>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Render Auth component when Sign In clicked */}
      {open && 
      <Dialog 
        open={open}
        onClose={(event, reason) => {
          if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return toggleAuth(false);
          }
        }}>
        <Auth toggleAuth={toggleAuth}/>
      </Dialog>}
    </>
  )
}

export default NavBar;
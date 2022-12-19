import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { AppBar, Button, IconButton, Stack,  Toolbar, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
// import LoginIcon from '@mui/icons-material/Login';


const NavBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <img className='CE-LogoImage' src='../../docs/assets/KnightOwl.PNG'/>
        </IconButton>
        <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
          KNIGHT OWL
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button color='inherit'>Sign Up</Button>
          <Button color='inherit'>About The Team</Button>
          <Button color='inherit'>NPM</Button>
          <IconButton>
            <GitHubIcon/>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, IconButton, Stack,  Toolbar, Typography, Dialog, SvgIcon } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import owlLogo from '../../docs/assets/KnightOwl.png';
import npmLogo from '../../docs/assets/npmLogo2.png';

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
            <Link  style={{ textDecoration: 'none' }} to={'/'}><img className='CE-LogoImage' src={owlLogo} width='50' height='50'/></Link>
          </IconButton>
          <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
            <Link  style={{ textDecoration: 'none' }} to={'/'}>KNIGHTOWL</Link>
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button color='inherit' onClick={()=>toggleAuth(true)}>Sign In</Button>
            <Button color='inherit'><Link  style={{ textDecoration: 'none' }} to={'about'}>About The Team</Link></Button>
            <IconButton>
              <a href="https://www.npmjs.com/package/knightowl"><img className='CE-LogoImage' src={npmLogo} width='50' height='50'/></a>
            </IconButton>
            <IconButton>
              <a href="https://github.com/oslabs-beta/Knight-Owl-Display"><GitHubIcon/></a>
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
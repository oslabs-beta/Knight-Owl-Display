import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const NavBar = () => {
  return (
    <div className='CE-NavBar' key={uuidv4()}>
      <nav>
        <img className='CE-LogoImage' src='../../docs/assets/KnightOwl.PNG'></img>
        <a>Sign Up</a>
        <a>About The Team</a>
        <a>GitHub</a>
        <a>NPM</a>
      </nav>
    </div>
  )
}

export default NavBar;
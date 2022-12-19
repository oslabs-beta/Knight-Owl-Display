import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const NavBar = () => {
  return (
    <div className='NavBar-CE' key={uuidv4()}>
      <nav>
        <a>Sign Up</a>
        <a>About The Team</a>
        <a>GitHub</a>
        <a>NPM</a>
      </nav>
    </div>
  )
}

export default NavBar;
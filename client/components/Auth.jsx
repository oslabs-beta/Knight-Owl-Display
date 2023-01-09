import React, { useState } from 'react';
import { redirect, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField} from '@mui/material';

// rendered by NavBar when Sign In clicked
const Auth = (props) => {
  // use the useState hook to manage state for whether the user is looking at login/auth fields and conditionally render accordingly
  const [displayState, toggleDisplay] = useState('logIn') // possible values: 'logIn', 'signUp'
  const [redirect, setRedirect] = useState(false);
  const [badSignIn, setBadSignIn] = useState(false);

  // use the useState hook to track user entry into login/signup fields
  const [fieldEntries, updateField] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
  })

  // track whether password fields match in signup form
  const [passwordMismatch, setPasswordMismatch] = useState({mismatch: false});

  // declare function to update fieldEntries state per user input in text fields
  async function trackInputToState(target) {
    const fieldToUpdate = target.id;
    const passInUpdate = {...fieldEntries};

    passInUpdate[fieldToUpdate] = target.value;
    updateField(passInUpdate)
  }

  // declare functions to send login/signup info on click to backend for authentication and authorization so user can be
  // redirected to navbar
  function sendForms() {
    // sends a mutation request to graphql endpoint on backend
    if (displayState === 'signUp' && fieldEntries.password !== fieldEntries.confirmPassword) {
      setPasswordMismatch({mismatch: true})
      return;
    };

    // check if state is current login or signup so that the mutation can be shaped accordingly
    let query, variables;
    if (displayState === 'signUp') {
      query = `mutation CreateUser($email: String, $password: String, $organization: String) {
        createUser(email: $email, password: $password, organization: $organization)
      }`; 

      variables = {
        email: fieldEntries.email,
        password: fieldEntries.password,
        organization: fieldEntries.organization,
      }
    } else {
      query = `query SignIn($email: String, $password: String) {
        signIn(email: $email, password: $password)
      }`;
      variables = {
        email: fieldEntries.email,
        password: fieldEntries.password,
      }
    };

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      }),
    })
    .then(data => data.json())
    .then(response => {
      if (response.data.signIn === 'Success' || response.data.createUser === 'Success') {
        setRedirect(true);
      } else {
        setBadSignIn(true);
      }
    })
  }

  // Renders either login or signup field depending on current state

  return (
    <div className='ON-Auth'>
      <Button onClick={() => toggleDisplay('logIn')}>Sign In</Button>
      <Button onClick={() => toggleDisplay('signUp')}>Create New Account</Button>
      <br/>
      {(displayState === 'logIn')
      ?
        <form className='ON-log-in-form'>
          <DialogContent>
            <TextField 
              type='text' 
              id='email' 
              placeholder='Email Address'
              onChange={(e) => trackInputToState(e.target)}>
            </TextField>
            <br />
            <TextField 
              type='password' 
              id='password' 
              placeholder='Password' 
              onChange={(e) => trackInputToState(e.target)}>
            </TextField>
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={sendForms}>Sign In</Button>
          </DialogActions>
        </form>
      :
        <form className='ON-sign-up-form'>
          <DialogContent>
            <TextField type='text' id='email' placeholder='Email Address' onChange={(e) => trackInputToState(e.target)}></TextField>
            <br />
            <TextField type='password' id='password' placeholder='Password' onChange={(e) => trackInputToState(e.target)}></TextField>
            <br />
            <TextField type='password' id='confirmPassword' placeholder='Confirm Password' onChange={(e) => trackInputToState(e.target)}></TextField>
            <br />
            <TextField type='text' id='organization' placeholder='Name' onChange={(e) => trackInputToState(e.target)}></TextField>
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={sendForms}>Sign Up</Button>
          </DialogActions>
          {passwordMismatch.mismatch === true &&
          <p className='warn'>Passwords do not match.</p>}
          </form>}
          {badSignIn === true &&
          <p className='warn'>Failed to sign in. Please try again.</p>}
          {redirect === true &&
          <Navigate to='/dashboard' replace='true' />}
    </div>
  )
}

export default Auth;
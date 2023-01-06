import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';

// rendered by NavBar when Sign In clicked
const Auth = (props) => {
  // use the useState hook to manage state for whether the user is looking at login/auth fields and conditionally render accordingly
  const [displayState, toggleDisplay] = useState('logIn') // possible values: 'logIn', 'signUp'

  // use the useState hook to track user entry into login/signup fields
  const [fieldEntries, updateField] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
  })

  // declare function to update fieldEntries state per user input in text fields
  function trackInputToState(target) {
    const fieldToUpdate = target.id;
    const passInUpdate = {...fieldEntries};


    passInUpdate[fieldToUpdate] = target.value;
    updateField(passInUpdate);
  }

  // declare functions to send login/signup info on click to backend for authentication and authorization so user can be
  // redirected to navbar
  function sendForms() {
    // send sa mutation request to graphql endpoint on backend

    // check if state is current login or signup so that the mutation can be shaped accordingly
    let query, variables;
    if (displayState === 'signUp') {
      // assumes our backend schema will have a mutation createUser to register new
      // users to db using object type NewUser
      // attempting to return user id as result of request
      query = `mutation CreateUser($email: String, $password: String, $organization: String) {
        createUser(email: $email, password: $password, organization: $organization)
      }`; 

      variables = {
        email: fieldEntries.email,
        password: fieldEntries.password,
        organization: fieldEntries.organization,
      }
      console.log('variables: ', variables)
    } else {
      // assumes our backend schema will have a query type signIn using
      // object type returningUser
      // attempting to return user id as result of request
      query = `query SignIn($email: String, $password: String) {
        signIn(email: $email, password: $password)
      }`;
      variables = {
        email: fieldEntries.email,
        password: fieldEntries.password,
      }
    };

    fetch('/graphQL', {
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
    .then(response => console.log(response))
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
            <TextField type='text' id='email' placeholder='Email Address' onChange={(e) => trackInputToState(e.target)}></TextField>
            <br />
            <TextField type='text' id='password' placeholder='Password' onChange={(e) => trackInputToState(e.target)}></TextField>
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
            <TextField type='text' id='password' placeholder='Password' onChange={(e) => trackInputToState(e.target)}></TextField>
            <br />
            <TextField type='text' id='confirm-password' placeholder='Confirm Password' onChange={(e) => trackInputToState(e.target)}></TextField>
            <br />
            <TextField type='text' id='organization' placeholder='Organization' onChange={(e) => trackInputToState(e.target)}></TextField>
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={sendForms}>Sign Up</Button>
          </DialogActions>
          </form>}
    </div>
  )
}

export default Auth;
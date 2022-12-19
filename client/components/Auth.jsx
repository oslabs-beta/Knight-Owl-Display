import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Dialog } from '@mui/material';

// rendered by NavBar when Sign In clicked
const Auth = (props) => {
  // use the useState hook to manage state for whether the user is looking at login/auth fields and conditionally render accordingly
  const [displayState, toggleDisplay] = useState('logIn') // possible values: 'logIn', 'signUp'

  // use the useState hook to track user entry into login/signup fields
  const [fieldEntries, updateField] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    organization: null,
  })

  // declare function to update fieldEntries state per user input in text fields
  function trackInputToState(target) {
    const fieldToUpdate = target.id;
    const passInUpdate = {...fieldEntries};

    passInUpdate[fieldToUpdate] = target.id.value;
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
      query = `mutation CreateUser($input: NewUser) {
        createUser(input: $input) {
          id
        }
      }`; 
      variables = {
        input: {
          ...fieldEntries,
        }
      }
    } else {
      // assumes our backend schema will have a query type signIn using
      // object type returningUser
      // attempting to return user id as result of request
      query = `query SignIn($input: ReturningUser) {
        signIn(input: $input) {
          id
        }
      }`
    };
      variables = {
        input: {
          email: fieldEntries.email,
          password: fieldEntries.password
        }
      }

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
  }

  // Renders either login or signup field depending on current state

  return (
    <div className='ON-Auth'>
      <Button onClick={() => toggleDisplay('logIn')}>Sign In</Button>
      <Button onClick={() => toggleDisplay('signUp')}>Create New Account</Button>
      <button onClick={()=>props.toggleAuth(false)}>X</button>
      {(displayState === 'logIn')
      ?
        <form className='ON-log-in-form'>
          <input type='text' id='email' placeholder='Email Address'></input>
          <br />
          <input type='text' id='password' placeholder='Password'></input>
          <br />
          <Button onClick={sendForms}>Sign In</Button>
        </form>
      :
        <form className='ON-sign-up-form'>
          <input type='text' id='email' placeholder='Email Address'></input>
          <br />
          <input type='text' id='organization' placeholder='Organization'></input>
          <br />
          <input type='text' id='password' placeholder='Password'></input>
          <br />
          <input type='text' id='confirm-password' placeholder='Confirm Password'></input>
          <br />
          <Button onClick={sendForms}>Sign Up</Button>
          </form>}
    </div>
  )
}

export default Auth;
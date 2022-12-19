import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Auth = () => {
  // use the useState hook to manage state for whether the user is looking at login/auth fields and conditionally render accordingly
  const [displayState, toggleDisplay] = useState('none') // possible values: 'none', 'logIn', 'signUp'

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
    if (displayState === 'signUp') {
      // assumes our backend schema will have a mutation createUser to register new
      // users to db using object type NewUser
      const query = `mutation CreateUser($input: NewUser) {
        createUser(input: $input)
      }`; 
      const variables = {
        input: {
          ...fieldEntries,
        }
      }
    } else {
      // assumes our backend schema will have a query type signIn using
      // object type returningUser
      const query = `query SignIn($input: returningUser) {
        signIn(input: $input)
      }`
    };
      const variables = {
        input: {
          email: fieldEntries.email,
          password: fieldEntries.password
        }
      }

    fetch('/graphQL', {
      method: 'POST',
      headers: 'application/json',
      body: JSON.stringify({
        query,
        variables
      }),
    })
  }


  return (
    <div className='ON-Auth' key={uuidv4()}>
      {/* render buttons to click on that will change state to show login/signup fields */}

      {/* if login or signup display states are true, render relevant form */}
    </div>
  )
}

export default Auth;
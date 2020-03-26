import React, { useState } from 'react';

import LogInInput from '../../components/LogInInput/LogInInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Statefull component that represents user's log in form. Queries back end with
 * captured user's email and password and changes App state that tracks login state.
 */
const LogIn = (props) => {
  // Component's states.
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  /**
   * Updates userEmail state on Email input's value change.
   * 
   * @param {event} event User's email input onCHange event.
   */
  const emailInputOnChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };

  /**
   * Updates userPassword state on Password input's value change.
   * 
   * @param {event} event User's password input onCHange event.
   */
  const passwordInputOnChangeHandler = (event) => {
    setUserPassword(event.target.value);
  }

  const logInHandler = (event) => {

    event.preventDefault();

    if (userEmail === 'admin@admin.com' && userPassword === 'admin') {

      setError(false);
      setHelperText('Successful Credentials');
      setLoggedIn(true);
    }

    else {

      setError(true);
      setHelperText('Incorrect username or password (admin@admin.com / admin)');
      setLoggedIn(false);
    }

  }

  return (
    <div className="card loginCard">
      <div className="card-body">
        <h4 className="card-title">Please Log In</h4>
        <h5 className="card-subtitle mb-2 text-muted">You need to log in order to use this service</h5>
        <form onSubmit={logInHandler}>
          <LogInInput
            inputId="userEmail"
            error={error}
            label="Email"
            inputType="email"
            inputPlaceholder="Enter Email"
            value={userEmail}
            onChangeHandler={emailInputOnChangeHandler} />
          <LogInInput
            inputId="userPassword"
            error={error}
            label="Password"
            inputType="password"
            inputPlaceholder="Enter Password"
            value={userPassword}
            onChangeHandler={passwordInputOnChangeHandler} />
          <button type="submit" className="btn mt-4 btn-outline-primary btn-lg btn-login btn-block">Log In <FontAwesomeIcon icon="chevron-right" /></button>
        </form>

        <p>{helperText}</p>

        <a href="https://www.tafesa.edu.au/">
          <button type="button" className="btn mt-4 btn-outline-primary col-sm-6 btn-lg btn-back btn-block"><FontAwesomeIcon icon="chevron-left" /> Back to TAFE SA</button>
        </a>

        <p>User is logged in: {isLoggedIn}</p>

      </div>
    </div>
  );
}

export default LogIn;
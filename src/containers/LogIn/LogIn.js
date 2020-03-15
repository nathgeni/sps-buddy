import React, { useState } from 'react';

import LogInInput from '../../components/LogInInput/LogInInput';
import Modal from '../../components/UI/Modal/Modal';

/**
 * Statefull component that represents user's log in form. Queries back end with
 * captured user's email and password and changes App state that tracks login state.
 */
const LogIn = (props) => {
  // Component's states.
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

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

  return (
    <Modal>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Please Log In</h4>
          <h5 className="card-subtitle mb-2 text-muted">You need to log in order to use this service</h5>
          <form>
            <LogInInput
              inputId="userEmail"
              label="Email"
              inputType="email"
              inputPlaceholder="Enter Email"
              value={userEmail}
              onChangeHandler={emailInputOnChangeHandler} />
            <LogInInput
              inputId="userPassword"
              label="Password"
              inputType="password"
              inputPlaceholder="Enter Password"
              value={userPassword}
              onChangeHandler={passwordInputOnChangeHandler} />
            <button type="button" className="btn mt-4 btn-outline-primary btn-lg btn-block">Log In</button>
          </form>
          <div className="card-body">
            <a href="https://www.tafesa.edu.au/" className="card-link">Back to TAFE SA</a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LogIn;
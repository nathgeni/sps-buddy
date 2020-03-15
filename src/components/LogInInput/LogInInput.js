import React from 'react';
import PropTypes from 'prop-types';

import styles from './LoginInput.module.css';

const logInInput = (props) => (
    <div className="form-group">
        <label htmlFor={props.inputId}>{props.label}</label>
        <input
            className={[styles.Myinput, "form-control"].join(" ")}
            id={props.inputId}
            type={props.inputType}
            placeholder={props.inputPlaceholder}
            value={props.value}
            onChange={props.onChangeHandler}/>
    </div>
);



logInInput.propTypes = {
    inputId: PropTypes.string,
    label: PropTypes.string,
    inputType: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default logInInput;
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders input of select type.
 * 
 * @param {*} props
 *  {string} selectID - html id,
 *  {string} label - label value,
 *  {string} value - current value,
 *  {func} onChangeHandler - handles selection changes,
 *  {array} children - options to select.
 */
const selectInput = (props) => (
  <div className="form-group">
    <label htmlFor={props.selectID}>{props.label}</label>
    <select
      className="form-control"
      id={props.selectID}
      value={props.value}
      onChange={props.onChangeHandler}>
      {props.children}
    </select>
  </div>
);

selectInput.propTypes = {
  selectID: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeHandler: PropTypes.func,
  children: PropTypes.array,
};

export default selectInput;
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Toggle switch UI element from Bootstrap.
 * 
 * @param {*} props switchID - compulsory unique string id to comply with html requirements,
 *                  isChecked - boolean represents current state (on/off),
 *                  switchToggledHandler - function that handles click on a switcher,
 *                  label - optional string label for switch.
 */
const toggleSwitch = (props) => (
  <div className="custom-control custom-switch">
    <input
      type="checkbox"
      className="custom-control-input"
      id={props.switchId}
      checked={props.isChecked}
      onChange={props.switchToggledHandler} />
    <label className="custom-control-label" htmlFor={props.switchId}>{props.label}</label>
  </div>
);

toggleSwitch.propTypes = {
  switchId: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  switchToggledHandler: PropTypes.func,
  label: PropTypes.string,
};

export default toggleSwitch;
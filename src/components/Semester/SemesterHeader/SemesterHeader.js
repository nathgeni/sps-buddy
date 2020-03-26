import React from 'react';
import PropTypes from 'prop-types';

/**
 * Represents header for a semester section.
 * @param {*} props 
 *  {string} value - value to display
 *  {bool} isActive - determines if header should be highlited
 */
const semesterHeader = (props) => (
  <div className={['card-header', (props.isActive) ? 'bg-primary text-white' : null].join(' ')}>
    {props.value}
  </div>
);

semesterHeader.propTypes = {
  value: PropTypes.string,
  isActive: PropTypes.bool,
};

export default semesterHeader;
import React from 'react';
import PropTypes from 'prop-types';

import SemesterHeader from './SemesterHeader/SemesterHeader';

/**
 * Renders semester data.
 * 
 * @param {*} props 
 *  {string} header - value for a semester header.
 *  {bool} isActive - determines if current semester is an active one.
 */
const semester = (props) => (
    <div className='card my-3 shadow'>
    <SemesterHeader
      value={props.header}
      isActive={props.isActive}
    />
    <ul className='list-group list-group-flush'>
      {props.children}
    </ul>
    </div>
);

semester.propTypes = {
  header: PropTypes.string,
  isActive: PropTypes.bool,
};

export default semester;
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Rendfer prerequisite for an unavailable subject.
 * 
 * @param {*} props
 *  {string} subjectCode - subject code,
 *  {string} subjectName - subject name, 
 */
const prerequisiteSubject = (props) => (
  <div className='pr-3'>
    <FontAwesomeIcon icon='ban' /> {props.subjectCode}: {props.subjectName}
  </div>
);

prerequisiteSubject.propTypes = {
  subjectCode: PropTypes.string,
  subjectName: PropTypes.string,
};

export default prerequisiteSubject;
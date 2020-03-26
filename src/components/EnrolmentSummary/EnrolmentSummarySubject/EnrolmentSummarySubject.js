import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Renders selected subject in enrolment summary.
 * 
 * @param {*} props 
 *  {string} subjectCode - subject code,
 *  {string} subjectName - subject name,
 *  {func} removeSubject - removes subject from the selection.
 */
const enrolmentSummarySubject = (props) => (
  <div>
    {props.subjectCode} - {props.subjectName}
    <button
      className='btn btn-link btn-sm text-danger'
      type="button"
      onClick={props.removeSubject}
    >
      <FontAwesomeIcon icon='times' /> Remove
    </button>
  </div>
);

enrolmentSummarySubject.propTypes = {
  subjectCode: PropTypes.string,
  subjectName: PropTypes.string,
};

export default enrolmentSummarySubject;
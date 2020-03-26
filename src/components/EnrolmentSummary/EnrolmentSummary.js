import React from 'react';
import PropTypes from 'prop-types';

import EnrolmentSummarySubject from './EnrolmentSummarySubject/EnrolmentSummarySubject';

/**
 * Short enrolment summary. Appears when at least one subject selected.
 * 
 * @param {*} props 
 *  {array} selectedSubjects - array of selected subjects,
 *  {number} minNumberOfCourses - min number of courses for the selected type of student,
 *  {func} subjectSelectionChangedHandler - handler to remove subject from selection,
 *  {bool} showCourses - determines visibility.
 */
const enrolmentSummary = (props) => {

  // Displays component only with courses list.
  if (!props.showCourses) {
    return null;
  }

  let subjects = null;
  let confirmButton = null;

  // Displays selected course and confirm button only when at least one course is selected..
  if (props.selectedSubjects && props.selectedSubjects.length > 0) {
    subjects = props.selectedSubjects.map(subject => (
      <li className='list-group-item' key={subject.nationalCode}>
        <EnrolmentSummarySubject
          subjectCode={subject.subjectCode}
          subjectName={subject.subjectName}
          removeSubject={props.subjectSelectionChangedHandler
            .bind(this, subject.parentSemester, subject.nationalCode)}
        />
      </li>
    ));

    confirmButton = (
      <button className='btn btn-success btn-lg btn-block'>Confirm</button>
    );
  }

  return (
    <section>
      <div className='card shadow my-3'>
        <div className='card-body'>
          <h3 className='card-title'>Selected subjects</h3>
          <p className='card-text'>
            You have selected {props.selectedSubjects.length} of {props.minNumberOfCourses} required courses.
          </p>
        </div>
        <ul className='list-group list-group-flush'>
          {subjects}
        </ul>
        <div className='card-body'>
          {confirmButton}
        </div>
      </div>
    </section>
  );
};

enrolmentSummary.propTypes = {
  selectedSubjects: PropTypes.array,
  minNumberOfCourses: PropTypes.number,
  subjectSelectionChangedHandler: PropTypes.func,
  showCourses: PropTypes.bool,
};

export default enrolmentSummary;
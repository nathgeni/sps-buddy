import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PrerequisiteSubject from '../PrerequisiteSubject/PrerequisiteSubject';
import ToggleSwitch from '../../UI/ToggleSwitch/ToggleSwitch';

/**
 * Renders subject.
 * 
 * @param {*} props 
 *  {string} nationalCode - subject national code,
 *  {string} subjectName - subject name,
 *  {string} subjectCode - subject code,
 *  {string} competencyName - competency name,
 *  {string} competencyType - competency type,
 *  {string} tafeCode - TAFE code,
 *  {string} trainingPackage - training package,
 *  {number} credits - credits for the subject,
 *  {string} grade - grade for the course,
 *  {object} campus - campus where course was graded,
 *  {string} price - formated price,
 *  {array} prerequisites - prerequisites that block enrollment,
 *  {bool} selected - determines if subject selected,
 *  {func} subjectSelectionChangedHandler - handles selection,
 *  {string} semester - semester that subject belongs to.
 */
const subject = (props) => {
  let grade = null;
  let campus = null;
  let price = null;
  let prerequisites = null;
  let switcher = null;
  let selectButton = null;
  let badge = null;
  // Case subject graded.
  if (props.grade) {
    badge = (
      <h5><span className="badge badge-info">Graded</span></h5>
    );
    grade = (
      <div>Result: {props.grade}</div>
    );
    campus = (
      <div>Campus: {props.campus.campusName}</div>
    );
  } else {
    // Else subject available or has prerequisites.
    price = (
      <div>Price: {props.price}</div>
    );

    // Subject with unmet prerequisites.
    if (props.prerequisites && props.prerequisites.length > 0) {
      const prerequisitesList = props.prerequisites.map(prerequisite => (
        <PrerequisiteSubject
          key={prerequisite.nationalCode}
          subjectCode={prerequisite.subjectCode}
          subjectName={prerequisite.subjectName}
        />
      ));

      badge = (
        <h5><span className="badge badge-warning">Has prerequisites</span></h5>
      );

      prerequisites = (
        <Fragment>
          <h5>Unmet Prerequisites</h5>
          <div className="d-flex justify-content-start flex-wrap">
            {prerequisitesList}
          </div>
        </Fragment>
      );
    } else {
      // Else subject is selectable.
      switcher = (
        <ToggleSwitch
          switchId={props.nationalCode}
          isChecked={props.selected}
          switchToggledHandler={props.subjectSelectionChangedHandler.bind(this, props.semester, props.nationalCode)}
        />
      );

      selectButton = (
        <button
          className="btn btn-primary"
          onClick={props.subjectSelectionChangedHandler.bind(this, props.semester, props.nationalCode)}
        >
          {(props.selected) ? 'Remove' : 'Add'}
        </button>
      );
    }
  }

  return (
    <div>
      {switcher}
      {badge}
      {grade}
      <div>Subject: {props.subjectCode} - {props.subjectName}</div>
      <div>Competency: {props.competencyName}</div>
      <div>Competency Type: {props.competencyType}</div>
      <div>National Code: {props.nationalCode}</div>
      <div>TAFE Code: {props.tafeCode}</div>
      <div>Training Packcage: {props.trainingPackage}</div>
      <div>Credits: {props.credits}</div>
      {campus}
      {price}
      {prerequisites}
      {selectButton}
    </div>
  );
};

subject.propTypes = {
  nationalCode: PropTypes.string,
  subjectName: PropTypes.string,
  subjectCode: PropTypes.string,
  competencyName: PropTypes.string,
  competencyType: PropTypes.string,
  tafeCode: PropTypes.string,
  trainingPackage: PropTypes.string,
  credits: PropTypes.number,
  grade: PropTypes.string,
  campus: PropTypes.object,
  price: PropTypes.string,
  prerequisites: PropTypes.array,
  selected: PropTypes.bool,
  subjectSelectionChangedHandler: PropTypes.func,
  semester: PropTypes.string,
};

export default subject;
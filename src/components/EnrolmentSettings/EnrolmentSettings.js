import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SelectedQualification from './SelectedQualification/SelectedQualification';
import ChooseQualification from './ChooseQualification/ChooseQualification';
import SetStudentType from './SetStudentType/SetStudentType';
import StudentType from './StudentType/StudentType';

/**
 * Captures required information to start enrollment process.
 * 
 * @param {*} props
 *  {object} student - represents student,
 *  {object} qualificationToEnroll - represents selected qualification,
 *  {array} availableQualifications - qualifications available for the student,
 *  {func} setQualificationToEnroll - sets selected qualification,
 *  {object} selectedCampus - campus of enrollment,
 *  {func} setSelectedCampus - sets selected campus,
 *  {array} studentTypes - available student types (like full-time/part-time),
 *  {func} setStudent - sets student's data.
 */
const enrollmentSettings = (props) => {

  // If qualification selected renders its data, input field otherwise.
  const settingsSection = (props.qualificationToEnroll)
    ? (
      <SelectedQualification
        numberOfAvailableQualifications={props.availableQualifications.length}
        setQualificationToEnroll={props.setQualificationToEnroll}
        qualificationToEnroll={props.qualificationToEnroll}
        selectedCampus={props.selectedCampus}
        setSelectedCampus={props.setSelectedCampus} />
    )
    : (
      <ChooseQualification
        availableQualifications={props.availableQualifications}
        setQualificationToEnroll={props.setQualificationToEnroll}
        qualificationToEnroll={props.qualificationToEnroll} />
    );

  const studentTypeSection = (props.student.studentType)
    ? (
      <StudentType
        studentType={props.student.studentType}
        numberOfStudentTypes={props.studentTypes.length}
        setStudent={props.setStudent} />
    )
    : (
      <SetStudentType
        studentTypes={props.studentTypes}
        studentType={props.student.studentType}
        setStudent={props.setStudent} />
    );

  return (
    <Fragment>
      <h2>Student Data</h2>
      <div>Student: {props.student.firstName} {props.student.lastName}</div>
      {studentTypeSection}
      {settingsSection}
    </Fragment>
  );
};

enrollmentSettings.propTypes = {
  student: PropTypes.object,
  qualificationToEnroll: PropTypes.object,
  availableQualifications: PropTypes.array,
  setQualificationToEnroll: PropTypes.func,
  selectedCampus: PropTypes.object,
  setSelectedCampus: PropTypes.func,
  studentTypes: PropTypes.array,
  setStudent: PropTypes.func,
};

export default enrollmentSettings;
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CaptureSetting from './CaptureSetting/CaptureSetting';
import DisplaySetting from './DisplaySetting/DisplaySetting';

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
 *  {func} setStudent - sets student's data,
 *  {func} setStudyPlan - needs to reset displaying study plan.
 */
const enrollmentSettings = (props) => {

  // If qualification selected renders its data, input field otherwise.
  let campusSection = null;
  let studentTypeSection = null;

  /**
   * Updates state for a selected qualification. If qualification has only one
   * campus updates selected one as well.
   * 
   * @param {object} newQualification - selected qualification.
   */
  const qualificationChangeHandler = (newQualification) => {
    props.setQualificationToEnroll(newQualification);
    // Sets campus as selected if only one is available.
    if (newQualification.availableCampuses.length === 1) {
      props.setSelectedCampus(newQualification.availableCampuses[0]);
    }
  };

  let qualificationSection = (
    <CaptureSetting
      options={props.availableQualifications}
      optionKey='qualificationNationalCode'
      valueKey='qualificationNationalCode'
      optionDisplayKeys={['qualificationName']}
      updateTargetedState={qualificationChangeHandler}
      selectID='qualificationSelect'
      label='Select Your Qualification'
      currentStateValue={props.qualificationToEnroll}
      optionPlaceholder='Qualification'
    />
  );

  if (props.qualificationToEnroll) {
    /**
     * Resets student type and student plan.
     */
    const studentTypeChangeButtonClickHandler = () => {
      props.setStudent(oldState => {
        return {
          ...oldState,
          studentType: null,
        }
      });
      props.setStudyPlan(null);
    };

    /**
     * Resets selected campus, student type and study plan.
     */
    const campusChangeButtonClickHandler = () => {
      props.setSelectedCampus(null);
      studentTypeChangeButtonClickHandler();
    };

    /**
     * Resets all settings.
     */
    const qualificationChangeButtonClickHandler = () => {
      props.setQualificationToEnroll(null);
      campusChangeButtonClickHandler();
    };

    qualificationSection = (
      <DisplaySetting
        numberOfOptions={props.availableQualifications.length}
        changeButtonClickHandler={qualificationChangeButtonClickHandler}
        displayObject={props.qualificationToEnroll}
        displayLabelKeyPairs={[
          ['Qualification name:', 'qualificationName'],
          ['TAFE Code:', 'qualificationTafeCode'],
          ['National Code:', 'qualificationNationalCode']
        ]}
      />
    );

    campusSection = (
      <CaptureSetting
        options={props.qualificationToEnroll.availableCampuses}
        optionKey='campusCode'
        valueKey='campusCode'
        optionDisplayKeys={['campusCode', 'campusName']}
        optionDisplayValueDelimiter=' - '
        updateTargetedState={props.setSelectedCampus}
        selectID='selectCampus'
        label='Select Campus'
        currentStateValue={props.selectedCampus}
        optionPlaceholder='Campus'
      />
    );

    if (props.selectedCampus) {

      campusSection = (
        <DisplaySetting
          numberOfOptions={props.qualificationToEnroll.availableCampuses.length}
          changeButtonClickHandler={campusChangeButtonClickHandler}
          displayObject={props.selectedCampus}
          displayLabelKeyPairs={[['Campus:', 'campusName']]}
        />
      );

      /**
       * Updates stydent type in student state.
       * 
       * @param {object} newStudentType new selected student type.
       */
      const studentTypeChangedHandler = (newStudentType) => {
        props.setStudent(oldState => {
          return {
            ...oldState,
            studentType: newStudentType,
          };
        });
      };

      studentTypeSection = (props.student.studentType)
        ? (
          <DisplaySetting
            numberOfOptions={props.studentTypes.length}
            changeButtonClickHandler={studentTypeChangeButtonClickHandler}
            displayObject={props.student.studentType}
            displayLabelKeyPairs={[['Student Type:', 'typeName']]}
          />
        )
        : (
          <CaptureSetting
            options={props.studentTypes}
            optionKey='typeID'
            valueKey='typeID'
            optionDisplayKeys={['typeName']}
            updateTargetedState={studentTypeChangedHandler}
            selectID='selectStudentType'
            label='Select Student Type'
            currentStateValue={props.student.studentType}
            optionPlaceholder='Student Type'
          />
        );
    }
  }

  return (
    <Fragment>
      <h2>Student's Data</h2>
      <div>Student: {props.student.firstName} {props.student.lastName}</div>
      {qualificationSection}
      {campusSection}
      {studentTypeSection}
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
  setStudyPlan: PropTypes.func,
};

export default enrollmentSettings;
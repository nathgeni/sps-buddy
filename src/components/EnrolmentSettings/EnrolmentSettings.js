import React from 'react';
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
 *  {bool} showCourses - defines if courses shown,
 *  {func} setShowCourses - sets state for showCourses,
 *  {func} getStudyPlanForSelectedQualification - show course button on click handler,
 *  {func} setSelectedSubjects - used to delete selected subjects,
 *  {func} setStudyPlan - to remove study plan on settings changed.
 */
const enrollmentSettings = (props) => {

  // Declares sections for later use.
  let campusSection = null;
  let studentTypeSection = null;
  let showSubjectsButton = null;

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

  // Lets user to choose qualification.
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
    // Functions to reset selections.
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
      props.setShowCourses(false);
      props.setSelectedSubjects([]);
      props.setStudyPlan([]);
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

    // Displays selected qualification.
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

    // Renders input to select campus.
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
      // Reners selected campus.
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

      // Reders input to select student type.
      studentTypeSection = (
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

      if (props.student.studentType) {
        // Renders selected student type.
        studentTypeSection = (
          <DisplaySetting
            numberOfOptions={props.studentTypes.length}
            changeButtonClickHandler={studentTypeChangeButtonClickHandler}
            displayObject={props.student.studentType}
            displayLabelKeyPairs={[['Student Type:', 'typeName']]}
          />
        );

        // Renders button to show courses for selected options. Button should
        // disappear after courses shown to the user.
        if (!props.showCourses) {
          /**
           * Sets courses to display according to the settings.
           */
          const showSubjectButtonClickHandler = () => {
            props.getStudyPlanForSelectedQualification();
            props.setShowCourses(true);
          };

          showSubjectsButton = (
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={showSubjectButtonClickHandler}
            >
              Show Subjects
            </button>
          );
        }
      }
    }
  }

  return (
    <section>
      <div className='card shadow my-3'>
        <div className='card-body'>
          <h2 className='card-title'>Student's Data</h2>
          <div>Student: {props.student.firstName} {props.student.lastName}</div>
          <form>
            {qualificationSection}
            {campusSection}
            {studentTypeSection}
            {showSubjectsButton}
          </form>
        </div>
      </div>
    </section>
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
  showCourses: PropTypes.bool,
  setShowCourses: PropTypes.func,
  getStudyPlanForSelectedQualification: PropTypes.func,
  setSelectedSubjects: PropTypes.func,
  setStudyPlan: PropTypes.func,
};

export default enrollmentSettings;
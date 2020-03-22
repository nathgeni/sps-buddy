import React from 'react';
import PropTypes from 'prop-types';

import SelectInput from '../../UI/SelectInput/SelectInput';

/**
 * Renders input to select qualification for further enrolment.
 * 
 * @param {*} props
 *  {array} availableQualifications - qualifications available for student,
 *  {func} setQualificationToEnroll - changes selected qualification,
 *  {object} qualificationToEnroll - current selected qualification.
 */
const chooseQualification = (props) => {

  /**
   * Handles onChange event for qualification input.
   * 
   * @param {*} event select on change event.
   */
  const selectQualificationOnChangeHandler = (event) => {
    // If selected option has value determine which qualification was chousen.
    // Based on Qualification's National Code.
    if (event.target.value) {
      const selectedQualification = props.availableQualifications
        .filter(qualification => qualification.qualificationNationalCode === event.target.value);
      // Sets selected qualification only if it is unique in student's list of available qualifications.
      if (selectedQualification.length === 1) {
        props.setQualificationToEnroll(selectedQualification[0]);
      } else {
        // Log error.
        console.error('Error: Student has several qualifications with the same national code');
      }
    }
  };

  // Creates options for qualification select.
  const availableQualificationsSelect = props.availableQualifications
    .map(qualification => (
      <option
        key={qualification.qualificationNationalCode}
        value={qualification.qualificationNationalCode}>
        {qualification.qualificationName}
      </option>
    ));

  return (
    <SelectInput
      selectID="qualificationSelect"
      label="Select Your Qualification"
      value={(props.qualificationToEnroll)
        ? props.qualificationToEnroll.qualificationNationalCode
        : ''}
      onChangeHandler={selectQualificationOnChangeHandler}>
        <option
          value=''
          disabled>Qualification</option>
        {availableQualificationsSelect}
      </SelectInput>
  );
}

chooseQualification.propTypes = {
  availableQualifications: PropTypes.array,
  setQualificationToEnroll: PropTypes.func,
  qualificationToEnroll: PropTypes.object,
};

export default chooseQualification;
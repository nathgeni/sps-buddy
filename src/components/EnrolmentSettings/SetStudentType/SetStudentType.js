import React from 'react';
import PropTypes from 'prop-types';

import ErrorView from '../../ErrorView/ErrorView';
import SelectInput from '../../UI/SelectInput/SelectInput';

/**
 * Renders input to select student type.
 * 
 * @param {*} props
 *  {array} studentTypes - array of available student types,
 *  {object} studentType - current type value,
 *  {func} setStudent - sets new state for student.
 */
const setStudentType = (props) => {
  // Renders error if no student types available.
  if (!props.studentTypes || props.studentTypes.length === 0) {
    return (
      <ErrorView errorMessage="Can't determine student type" />
    );
  }

  // Create options for the input.
  const options = props.studentTypes
    .map(studentType => (
      <option
        key={studentType.typeID}
        value={studentType.typeID}>{studentType.typeName}</option>
    ));

  const studentTypeOnChangeHandler = (event) => {
    if (event.target.value) {
      const selectedType = props.studentTypes
        .filter(studentType => studentType.typeID === event.target.value);

      if (selectedType.length === 1) {
        props.setStudent((oldState) => {
          return {
            ...oldState,
            studentType: selectedType[0],
          };
        });
      }
    }
  };

  return (
    <SelectInput
      selectID='selectStudentType'
      label='Select Student Type'
      value={(props.studentType) ? props.studentType : ''}
      onChangeHandler={studentTypeOnChangeHandler}>
      <option
        value=''
        disabled>Student Type</option>
      {options}
    </SelectInput>
  );
};

setStudentType.propTypes = {
  studentTypes: PropTypes.array,
  studentType: PropTypes.object,
  setStudent: PropTypes.func,
};

export default setStudentType;
import React from 'react';
import PropTypes from 'prop-types';

import SelectInput from '../../UI/SelectInput/SelectInput';
import ErrorView from '../../ErrorView/ErrorView';

/**
 * Render input to select available campus.
 * 
 * @param {*} props
 *  {array} availableCampuses - campuses availeble for this qualification,
 *  {object} selectedCampus - selected campus,
 *  {func} setSelectedCampus - sets selected campus.
 */
const chooseCampus = (props) => {

  // Shows error if no campuses available.
  if (!props.availableCampuses || props.availableCampuses.length === 0) {
    return (
      <ErrorView errorMessage='No campuses available for this qualification' />
    );
  }

  // Creates options for the input.
  const campuses = props.availableCampuses
    .map(campus => (
      <option
        key={campus.campusCode}
        value={campus.campusCode}>{campus.campusCode} - {campus.campusName}</option>
    ));

  const selectCampusOnChangeHandler = (event) => {
    if (event.target.value) {
      const selectedCampus = props.availableCampuses
        .filter(campus => campus.campusCode === event.target.value);

      if (selectedCampus.length === 1) {
        props.setSelectedCampus(selectedCampus[0])
      } else {
        // Log error.
        console.error('Campus selection error');
      }
    }
  };

  return (
    <SelectInput
      selectID="selectCampus"
      label="Select Campus"
      value={(props.selectedCampus) ? props.selectedCampus.campusCode : ''}
      onChangeHandler={selectCampusOnChangeHandler}>
      <option
        value=''
        disabled>Campus</option>
      {campuses}
    </SelectInput>
  );
};

chooseCampus.propTypes = {
  availableCampuses: PropTypes.array,
  selectedCampus: PropTypes.object,
  setSelectedCampus: PropTypes.func,
};

export default chooseCampus;
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ChooseCampus from '../ChooseCampus/ChooseCampus';
import SelectedCampus from '../SelectedCampus/SelectedCampus';

/**
 * Renders selected qualification's data.
 * 
 * @param {*} props
 *  {number} numberOfAvailableQualifications - number of available for enrolment qualifications,
 *  {func} setQualificationToEnroll - sets qualification to enroll, needed for reseting selected qualification,
 *  {object} qualificationToEnroll - selected qualification,
 *  {object} selectedCampus - selected campus for the qualification,
 *  {func} setSelectedCampus - sets selected campus
 */
const selectedQualification = (props) => {

  // Change button is available only when student has several qualifications.
  let buttonToChangeSelectedQualification = null;

  if (props.numberOfAvailableQualifications !== 1) {
    /**
     * Sets selected qualification and campus to null on button click.
     */
    const changeQualificationButtonClick = () => {
      props.setQualificationToEnroll(null);
      props.setSelectedCampus(null);
    };

    buttonToChangeSelectedQualification = (
      <button
        type="button"
        className="btn btn-link"
        onClick={changeQualificationButtonClick}>Change</button>
    );
  }

  // Sets campus as selected if only one is available.
  if (props.qualificationToEnroll.availableCampuses.length === 1) {
    props.setSelectedCampus(props.qualificationToEnroll.availableCampuses[0]);
  }
  // Renders selected campus or imput to choose it.
  const campus = (props.selectedCampus)
    ? <SelectedCampus
      selectedCampus={props.selectedCampus}
      numberOfAvailableCampuses={props.qualificationToEnroll.availableCampuses.length}
      setSelectedCampus={props.setSelectedCampus} />
    : <ChooseCampus
      availableCampuses={props.qualificationToEnroll.availableCampuses}
      selectedCampus={props.selectedCampus}
      setSelectedCampus={props.setSelectedCampus} />

  return (
    <Fragment>
      <div>Qualification name: {props.qualificationToEnroll.qualificationName}</div>
      <div>TAFE Code: {props.qualificationToEnroll.qualificationTafeCode}</div>
      <div>National Code: {props.qualificationToEnroll.qualificationNationalCode}</div>
      {buttonToChangeSelectedQualification}
      {campus}
    </Fragment>
  );
}

selectedQualification.propTypes = {
  numberOfAvailableQualifications: PropTypes.number,
  setQualificationToEnroll: PropTypes.func,
  qualificationToEnroll: PropTypes.object,
  selectedCampus: PropTypes.object,
  setSelectedCampus: PropTypes.func,
}

export default selectedQualification;
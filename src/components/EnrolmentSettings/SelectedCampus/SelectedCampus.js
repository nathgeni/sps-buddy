import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders selected campus data.
 * 
 * @param {*} props
 *  {object} selectedCampus - selected campus,
 *  {number} numberOfAvailableCampuses - number of available campuses for the enrolment,
 *  {func} setSelectedCampus - used to remove selected campus.
 */
const selectedCampus = (props) => {

  // Button to change campus is available only if there're several campuses to choose.
  let changeCampusButton = null;
  if (props.numberOfAvailableCampuses > 1) {
    /**
     * Sets selected campus to null on button click.
     */
    const changeCampusButtonClickHandler = () => {
      props.setSelectedCampus(null);
    };

    changeCampusButton = (
      <button
        type="button"
        className="btn btn-link"
        onClick={changeCampusButtonClickHandler}>Change</button>
    );
  }

  return (
    <Fragment>
      <div>Campus: {props.selectedCampus.campusCode} - {props.selectedCampus.campusName}</div>
      {changeCampusButton}
    </Fragment>
  );
};

selectedCampus.propTypes = {
  selectedCampus: PropTypes.object,
  numberOfAvailableCampuses: PropTypes.number,
  setSelectedCampus: PropTypes.func,
};

export default selectedCampus;
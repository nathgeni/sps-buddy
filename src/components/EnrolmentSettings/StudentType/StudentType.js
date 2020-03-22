import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders selected student type.
 * 
 * @param {*} props 
 *  {object} studentType - current student type,
 *  {number} numberOfStudentTypes - number of available student types,
 *  {func} setStudent - sets student data.
 */
const studentType = (props) => {
  // Button to change type available only if there're more than 1 type.
  let changeTypeButton = null;
  if (props.numberOfStudentTypes > 1) {
    /**
     * Sets student's studentType to null.
     */
    const changeStudentTypeButtonClickHandler = () => {
      props.setStudent(oldState => {
        return {
          ...oldState,
          studentType: null,
        };
      });
    };

    changeTypeButton = (
      <button
        type="button"
        className="btn btn-link"
        onClick={changeStudentTypeButtonClickHandler}>Change</button>
    );
  }

  return (
    <Fragment>
      <div>Student Type: {props.studentType.typeName}</div>
      {changeTypeButton}
    </Fragment>
  );
};

studentType.propTypes = {
  studentType: PropTypes.object,
  numberOfStudentTypes: PropTypes.number,
  setStudent: PropTypes.func,
};

export default studentType;
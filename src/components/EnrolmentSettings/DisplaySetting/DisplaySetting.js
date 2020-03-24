import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders captured setting.
 * 
 * @param {*} props 
 *  {number} numberOfOptions - number of options available for this setting,
 *  {func} changeButtonClickHandler - handles change button click
 *  {obj} displayObject - object to display.
 *  {array} displayLabelKeyPairs - data to display (should be in format [[{string} label, {string} object key], ...])
 */
const displaySetting = (props) => {

  // Change button available only when there're several option to choose from.
  let buttonToChangeSetting = null;
  if (props.numberOfOptions !== 1) {
    buttonToChangeSetting = (
      <button
        type='button'
        className='btn btn-link'
        onClick={props.changeButtonClickHandler}>Change</button>
    );
  }

  const displayView = props.displayLabelKeyPairs.map(labelKeyPair => (
    <div key={labelKeyPair[1]}>
      {labelKeyPair[0]} {props.displayObject[labelKeyPair[1]]}
    </div>
  ));

  return (
    <Fragment>
      {displayView}
      {buttonToChangeSetting}
    </Fragment>
  );
};

displaySetting.propTypes = {
  numberOfOptions: PropTypes.number,
  changeButtonClickHandler: PropTypes.func,
  displayObject: PropTypes.object,
  displayLabelKeyPairs: PropTypes.array,
};

export default displaySetting;
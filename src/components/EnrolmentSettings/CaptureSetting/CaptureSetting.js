import React from 'react';
import PropTypes from 'prop-types';

import SelectInput from '../../UI/SelectInput/SelectInput';

/**
 * Renders selectable input and updates state on select.
 * 
 * @param {*} props 
 *  {array} options - array of available options,
 *  {string} optionKey - key name for option's key attribute,
 *  {string} valueKey - key name for option's value,
 *  {array} optionDisplayKeys - array of key names to form option display value,
 *  {string} optionDisplayValueDelimiter - delimiter to use in join for option displayed value,
 *  {string} selectID - id for a lable and corresponding input,
 *  {string} label - label value,
 *  {object} currentStateValue - current value of a state that is set by this select,
 *  {string} stateValueKey - name of a key for the field of a currentStateValue object that used as value for the input,
 *  {string} optionPlaceholder - displayable value of the default disabled option,
 *  {func} updateTargetedState - function to update targeted state.
 */
const captureSetting = (props) => {

  // Creates options for the input.
  const options = props.options.map(option => {
    const displayValue = props.optionDisplayKeys.map(key => option[key]);
    return (
      // Value shown to the user forms from the list of values extracted from
      // the object and uses either " " or passed with props delimiter. 
      <option
        key={option[props.optionKey]}
        value={option[props.valueKey]}>
        {displayValue.join((props.optionDisplayValueDelimiter)
          ? props.optionDisplayValueDelimiter
          : ' ')}
      </option>
    );
  });

  const onSelectionChangedHandler = (event) => {
    // Changes state when new value is not an empty string.
    if (event.target.value) {
      props.updateTargetedState(
        props.options.find(option => option[props.valueKey] === event.target.value)
      );
    }
  };

  return (
    <SelectInput
      selectID={props.selectID}
      label={props.label}
      value={(props.currentStateValue)
        ? props.currentStateValue[props.stateValueKey]
        : ''}
      onChangeHandler={onSelectionChangedHandler}>
      <option
        value=''
        disabled>
        {props.optionPlaceholder}
      </option>
      {options}
    </SelectInput>
  );
};

captureSetting.propTypes = {
  options: PropTypes.array,
  optionKey: PropTypes.string,
  valueKey: PropTypes.string,
  optionDisplayKeys: PropTypes.array,
  optionDisplayValueDelimiter: PropTypes.string,
  selectID: PropTypes.string,
  label: PropTypes.string,
  currentStateValue: PropTypes.object,
  stateValueKey: PropTypes.string,
  optionPlaceholder: PropTypes.string,
  updateTargetedState: PropTypes.func,
};

export default captureSetting;
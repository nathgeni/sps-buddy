import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Modal from '../UI/Modal/Modal';

/**
 * Use this view to display fatal errors.
 * 
 * @param {*} props {string} errorMessage - message to display.
 */
const errorView = (props) => {
  return (
    <Fragment>
      <Modal>
        {props.errorMessage}
      </Modal>
    </Fragment>
  );
}

errorView.propTypes = {
  errorMessage: PropTypes.string.isRequired
}

export default errorView;
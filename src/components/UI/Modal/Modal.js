import React, { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

/**
 * Wrapper for a content that should be displayed as a modal window.
 * 
 * @param {*} props children - components/content to display in the modal view.
 */
const modal = (props) => (
  <Fragment>
    <Backdrop />
    <div className={styles.Modal}>{props.children}</div>
  </Fragment>
);

export default modal;
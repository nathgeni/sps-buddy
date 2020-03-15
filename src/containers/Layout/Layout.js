import React, { Fragment } from 'react';

const Layout = (props) => {
  return (
    <Fragment>
      <div>Naviagtion and header component goes here</div>
      <main className="container">{props.children}</main>
      <div>Footer component goes here</div>
    </Fragment>
  );
};

export default Layout;
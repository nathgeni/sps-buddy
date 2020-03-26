import React from 'react';

import Layout from '../Layout/Layout';
// import LogIn from '../LogInScreen/LogInScreen';
import EnrolmentScreen from '../EnrolmentScreen/EnrolmentScreen';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronLeft, faEnvelope, faTimes, faBan } from '@fortawesome/free-solid-svg-icons';
library.add(faChevronRight, faChevronLeft, faEnvelope, faTimes, faBan)


const App = (props) => {

  return (
    <Layout>
      {/* <LogIn /> */}
      <EnrolmentScreen />
    </Layout>
  );
}

export default App;

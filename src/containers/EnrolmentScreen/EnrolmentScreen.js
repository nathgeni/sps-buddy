import React, { Fragment, useState, useEffect } from 'react';

import Courses from '../../components/Courses/Courses';
import EnrolmentSettings from '../../components/EnrolmentSettings/EnrolmentSettings';
import ErrorView from '../../components/ErrorView/ErrorView';

// Rough representation of the server response.
import studentData from '../../models/dummyData/mockStudentData/mockStudentData';

/**
 * Enrolment activity view. Queries back-end to retireve student's subjects,
 * handles enrollment propcess. Shows all courses including completed
 * according to the student's study plan.
 */
const EnrolmentView = (props) => {
  const [student, setStudent] = useState({
    id: studentData.studentId,
    firstName: studentData.firstName,
    lastName: studentData.lastName,
    studentEmail: studentData.studentEmail
  });
  const [availableQualifications, setAvailableQualifications] = useState([]);
  const [qualificationToEnroll, setQualificationToEnroll] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [studentTypes] = useState([
    {
      typeID: 'FT',
      typeName: 'Full-time'
    },
    {
      typeID: 'PT',
      typeName: 'Part-time'
    }
  ]);
  const [studyPlan, setStudyPlan] = useState(null);

  // This section mocks setting of states after receiving server response.
  useEffect(() => {
    // Lets student to choose qualification.
    if (studentData.qualifications && studentData.qualifications.length > 0) {
      // Retrieves qualification data and prevents original source from mutations. 
      const studentQualifications = studentData.qualifications.map(qualification => {
        return {
          qualificationName: qualification.qualificationName,
          qualificationTafeCode: qualification.qualificationTafeCode,
          qualificationNationalCode: qualification.qualificationNationalCode,
          availableCampuses: qualification.availableCampuses,
        };
      });

      setAvailableQualifications(studentQualifications);

      // If student has only one qualification, sets it as selected.
      if (studentQualifications.length === 1) {
        setQualificationToEnroll(studentQualifications[0]);
      }
    } else {
      return (
        <ErrorView errorMessage='No qualification to proceed with enrolment' />
      )
    }
  }, []);

  // Button to retrieve list of subjects.
  let showSubjectsButton = null;
  if (student.studentType && qualificationToEnroll && selectedCampus && !studyPlan) {
    const showSubjectsButtonClickHandler = () => {
      // const qualificationWithSubjects = studentData.qualifications
      //   .filter(qualification => qualification.qualificationNationalCode ===)
      //TODO

      // setStudyPlan();
    };

    showSubjectsButton = (
      <button
        className="btn btn-primary btn-lg btn-block"
        onClick={showSubjectsButtonClickHandler}>Show Subjects</button>
    );
  }

  return (
    <Fragment>
      <h1>Enrolment</h1>
      <EnrolmentSettings
        student={student}
        availableQualifications={availableQualifications}
        setQualificationToEnroll={setQualificationToEnroll}
        qualificationToEnroll={qualificationToEnroll}
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
        studentTypes={studentTypes}
        setStudent={setStudent}
        setStudyPlan={setStudyPlan} />
      {showSubjectsButton}
      {(studyPlan)
        ? <Courses />
        : null}
    </Fragment>
  );
};

export default EnrolmentView;
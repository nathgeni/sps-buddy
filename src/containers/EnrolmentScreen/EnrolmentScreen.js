import React, { Fragment, useState, useEffect } from 'react';

import Subjects from '../../components/Subjects/Subjects';
import EnrolmentSettings from '../../components/EnrolmentSettings/EnrolmentSettings';
import ErrorView from '../../components/ErrorView/ErrorView';
import EnrolmentSummary from '../../components/EnrolmentSummary/EnrolmentSummary';

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
      typeName: 'Full-time',
      minNumberOfCourses: 5,
    },
    {
      typeID: 'PT',
      typeName: 'Part-time',
      minNumberOfCourses: 2,
    }
  ]);
  const [studyPlan, setStudyPlan] = useState([]);
  const [error, setError] = useState(null)
  const [showCourses, setShowCourses] = useState(false);
  const [enrollingSemester, setEnrollingSemester] = useState('2020 S1');
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Displays error if any.
  const errorSection = (error)
    ? (
      <ErrorView errorMessage={error} />
    )
    : null;

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
      setError('No qualification to proceed with enrolment');
    }
  }, []);

  /**
   * Sets study plan to show. May query DB here.
   */
  const getStudyPlanForSelectedQualification = () => {
    const selectedStudyPlan = studentData.qualifications.find(qualification =>
      qualification.qualificationNationalCode === qualificationToEnroll.qualificationNationalCode)
      .studyPlan;

    if (selectedStudyPlan) {
      const newStudyPlan = [...selectedStudyPlan];
      setStudyPlan(newStudyPlan);
      let preselectedSubjects = [];
      newStudyPlan.forEach(semester => {
        const semesterPreselectedSubjects = semester.subjects.filter(subject => {
          // Adds semester data to a preselected subject in order to retrieve from selectedSubjects.
          if (subject.selected) {
            subject.parentSemester = semester.semester;
            return true;
          } else {
            return false;
          }
        });
        if (semesterPreselectedSubjects && semesterPreselectedSubjects.length > 0) {
          preselectedSubjects = preselectedSubjects.concat(semesterPreselectedSubjects);
        }
      });
      setSelectedSubjects(preselectedSubjects);
    } else {
      setSelectedSubjects([]);
      setStudyPlan([]);
      setError('No subhects to enrol');
    }
  }

  /**
   * Handles subject selection. Changes data in stdudy plan and selected courses.
   * 
   * @param {string} semester - semester name
   * @param {string} nationalCode - subject national code
   */
  const subjectSelectionChangedHandler = (semester, nationalCode) => {
    setStudyPlan(oldState => {
      // Needs to create a new study plan list to trigger rerenderring as
      // selection changes happen in subject object that passes by reference.
      const newState = [...oldState];
      const selectedSemester = newState.find(studyPlanSemester => studyPlanSemester.semester === semester);
      const selectedSemesterSubject = selectedSemester.subjects.find(subject => subject.nationalCode === nationalCode);
      selectedSemesterSubject.selected = !selectedSemesterSubject.selected;

      // Updates selected subjects.
      setSelectedSubjects(oldSelection => {
        const newSelection = [...oldSelection];
        if (selectedSemesterSubject.selected) {
          // Adds semester name to the selected subject.
          selectedSemesterSubject.parentSemester = semester;
          newSelection.push(selectedSemesterSubject);
        } else {
          return newSelection.filter(subject => subject.nationalCode !== nationalCode);
        }
        return newSelection;
      });

      return newState;
    });
  };

  return (
    <Fragment>
      {errorSection}
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
        getStudyPlanForSelectedQualification={getStudyPlanForSelectedQualification}
        showCourses={showCourses}
        setShowCourses={setShowCourses}
        setSelectedSubjects={setSelectedSubjects}
        setStudyPlan={setStudyPlan}
      />
      <Subjects
        showCourses={showCourses}
        studyPlan={studyPlan}
        enrollingSemester={enrollingSemester}
        subjectSelectionChangedHandler={subjectSelectionChangedHandler}
      />
      <EnrolmentSummary
        showCourses={showCourses}
        selectedSubjects={selectedSubjects}
        minNumberOfCourses={(student.studentType) ? student.studentType.minNumberOfCourses : -1}
        subjectSelectionChangedHandler={subjectSelectionChangedHandler}
      />
    </Fragment>
  );
};

export default EnrolmentView;
import React from 'react';
import PropTypes from 'prop-types';

import Semester from '../Semester/Semester';
import Subject from './Subject/Subject';

/**
 * Renders student's subjects.
 * 
 * @param {*} props
 *  {bool} showCourses - determines visibility,
 *  {array} studyPlan - contains semesters with subjects,
 *  {string} enrollingSemester - active semester,
 *  {string} selectedCampus - selected campus,
 *  {func} subjectSelectionChangedHandler - handles subject selection.
 */
const subjects = (props) => {

  // Doesn't render if showCourses false.
  if (!props.showCourses) {
    return null;
  }

  const priceFormater = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' });

  

  const semestersSection = props.studyPlan.map(semester => {
    const semesterSubjects = semester.subjects.map(subject => (
      <li className='list-group-item' key={subject.nationalCode}>
        <Subject
          semester={semester.semester}
          subjectCode={subject.subjectCode}
          subjectName={subject.subjectName}
          competencyName={subject.competencyName}
          competencyType={subject.competencyType}
          nationalCode={subject.nationalCode}
          tafeCode={subject.tafeCode}
          trainingPackage={subject.trainingPackage}
          credits={subject.credits}
          grade={subject.grade}
          campus={subject.campus}
          price={priceFormater.format(subject.price)}
          prerequisites={subject.prerequisites}
          selected={subject.selected}
          subjectSelectionChangedHandler={props.subjectSelectionChangedHandler}
        />
      </li>
    ));

    return (
      <Semester
        key={semester.semester}
        header={semester.semester}
        isActive={semester.semester === props.enrollingSemester}
      >
        {semesterSubjects}
      </Semester>
    );
  });

  return (
    <section className='my-4'>
      <h2>Subjects</h2>
      {semestersSection}
    </section>
  );
}

subjects.propTypes = {
  showCourses: PropTypes.bool,
  studyPlan: PropTypes.array,
  enrollingSemester: PropTypes.string,
  selectedCampus: PropTypes.object,
  subjectSelectionChangedHandler: PropTypes.func,
};

export default subjects;
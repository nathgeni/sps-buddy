// This is a dummy object, for a demostartion purpose only. It roughly mocks
// object that can be retireved from the server and should not be passed into
// props directly.
const studentData = {
  studentId: '012026',
  firstName: 'John',
  lastName: 'Doe',
  studentEmail: 'john.doe@dummy-data.com',
  registeringSemester: '2020 S1',
  qualifications: [
    {
      qualificationName: 'Diploma of Software Development',
      qualificationTafeCode: 'TP01151',
      qualificationNationalCode: 'ICT50718',
      availableCampuses: [
        {
          campusCode: 'ADL',
          campusName: 'Adelaide City',
        },
        {
          campusCode: 'BER',
          campusName: 'Berri',
        },
        {
          campusCode: 'EXT',
          campusName: 'External',
        }
      ],
      studyPlan: [
        {
          semester: '2019 S2',
          subjects: [
            {
              subjectCode: '5C#W',
              subjectName: 'Advance C# Web (ASP.NET 4.0)',
              competencyName: 'Apply advanced programming skills in another language',
              competencyType: 'STR',
              nationalCode: 'ICTPRG523',
              tafeCode: 'TAADN',
              trainingPackage: 'C',
              credits: 80,
              grade: "Credit",
              campus: {
                campusCode: 'ADL',
                campusName: 'Adelaide City',
              },
            },
            {
              subjectCode: '5JAM',
              subjectName: 'Java For Mobile Development',
              competencyName: 'Apply intermediate object-oriented language skills',
              competencyType: 'STR',
              nationalCode: 'ICTPRG527',
              tafeCode: 'TAADP',
              trainingPackage: 'C',
              credits: 60,
              grade: "Distinction",
              campus: {
                campusCode: 'EXT',
                campusName: 'External',
              },
            },
          ],
        },
        {
          semester: '2020 S1',
          subjects: [
            {
              subjectCode: '5IOSMD',
              subjectName: 'iOS Mobile Application Development',
              competencyName: 'Build advanced user interface',
              competencyType: 'STR',
              nationalCode: 'ICTPRG505',
              tafeCode: 'AAHY',
              trainingPackage: 'LE',
              credits: 60,
              price: 357.00,
              selected: false,
            },
            {
              subjectCode: '5JAW',
              subjectName: 'Java Enterprise Programming',
              competencyName: 'Apply advanced object-oriented language skills',
              competencyType: 'STR',
              nationalCode: 'ICTPRG532',
              tafeCode: 'TABGD',
              trainingPackage: 'C',
              credits: 80,
              price: 476.00,
              selected: false,
            },
            {
              subjectCode: '5MITP',
              subjectName: 'Project Management',
              competencyName: 'Manage ICT Projects',
              competencyType: 'STR',
              nationalCode: 'ICTPMG501',
              tafeCode: 'TAACR',
              trainingPackage: 'LE',
              credits: 80,
              price: 476.00,
              selected: false,
            }
          ],
        },
        {
          semester: '2020 S2',
          gradedSubjects: [],
          subjects: [
            {
              subjectCode: '5TSD',
              subjectName: 'Team Based Software Development',
              competencyName: 'Manage a project using software management tools',
              competencyType: 'STR',
              nationalCode: 'ICTPRG502',
              tafeCode: 'TAADH',
              trainingPackage: 'C',
              credits: 60,
              price: 357.00,
              selected: false,
            },
            {
              subjectCode: '5TSD',
              subjectName: 'Deploy an application to a production environment',
              competencyName: 'Deploy an application to a production environment',
              competencyType: 'STR',
              nationalCode: 'ICTPRG504',
              tafeCode: 'TAADL',
              trainingPackage: 'C',
              credits: 40,
              price: 238.00,
              selected: false,
            },
            {
              subjectCode: '5SDA',
              subjectName: 'Systems Design Advanced',
              competencyName: 'Develop technical requirements for business solutions',
              competencyType: 'STR',
              nationalCode: 'ICTSAD505',
              tafeCode: 'TAAKL',
              trainingPackage: 'E',
              credits: 30,
              price: 178.00,
              prerequisites: [
                {
                  subjectCode: '5JAW',
                  subjectName: 'Java Enterprise Programming',
                  competencyName: 'Apply advanced object-oriented language skills',
                  nationalCode: 'ICTPRG532',
                  tafeCode: 'TABGD',
                }
              ],
            },
            {
              subjectCode: '6CLP',
              subjectName: 'Cloud Programming',
              competencyName: 'Create cloud computing services',
              competencyType: 'STR',
              nationalCode: 'ICTPRG604',
              tafeCode: 'TAAKA',
              trainingPackage: 'LE',
              credits: 60,
              price: 357.00,
              prerequisites: [
                {
                  subjectCode: '5JAW',
                  subjectName: 'Java Enterprise Programming',
                  competencyName: 'Apply advanced object-oriented language skills',
                  nationalCode: 'ICTPRG532',
                  tafeCode: 'TABGD',
                  status: 'required',
                },
                {
                  subjectCode: '5TSD',
                  subjectName: 'Team Based Software Development',
                  competencyName: 'Manage a project using software management tools',
                  nationalCode: 'ICTPRG502',
                  tafeCode: 'TAADH',
                },
              ],
            },
          ],
        }
      ],
    },
    {
      qualificationName: 'Dummy qualification to mock errors',
      qualificationTafeCode: '000000',
      qualificationNationalCode: '156468E',
      availableCampuses: [
        {
          campusCode: 'EXT',
          campusName: 'External',
        }
      ],
    }
  ],
};

export default studentData;
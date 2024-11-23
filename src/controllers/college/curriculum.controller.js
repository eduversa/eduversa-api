const { Response } = require("../../helpers");
const {
  CurriculumService,
  DepartmentService,
  FacultyService,
  SubjectService,
} = require("../../services");

class CurriculumController {
  //   static createNewCurriculum = async (req, res, next) => {
  //     try {
  //       const data = req.body;
  //       const department = await DepartmentService.getDepartmentById(
  //         data.department_id
  //       );
  //       //   Checks Subject IDs
  //       const subjects = await new Promise((resolve, reject) => {
  //         const subjects = data.subjects.map(async (subject) => {
  //           const subjectData = await SubjectService.getOneSubjectUsingId(
  //             subject.id
  //           );
  //           return {
  //             id: subject.id,
  //             name: subjectData.name,
  //             code: `${data.department_id}/${data.semester}/${subject.id}`,
  //             type: subjectData.type,
  //             classes_per_week: subject.classes_per_week,
  //             assigned_faculty: new Promise((resolved) => {
  //               subject.assigned_faculty.map(async (faculty_id) => {
  //                 await FacultyService.getOneFacultyByUserIdOrFacultyId(
  //                   faculty_id
  //                 );
  //                 return faculty_id;
  //               });
  //             }),
  //           };
  //         });
  //         resolve(subjects);
  //       });
  //       data.subjects = subjects;
  //       const curriculum = await CurriculumService.createNewCurriculum(data);
  //       new Response.Created(res)
  //         .setMessage("Curriculum Created Successfully")
  //         .setData(curriculum)
  //         .send();
  //     } catch (error) {
  //       console.log("Error - Curriculum Controller - createNewCurriculum");
  //       next(error);
  //     }
  //   };

  static createNewCurriculum = async (req, res, next) => {
    try {
      const data = req.body;

      // Validate department existence
      const department = await DepartmentService.getDepartmentById(
        data.department_id
      );

      // Process subjects with faculty assignments
      const subjects = await Promise.all(
        data.subjects.map(async (subject) => {
          const subjectData = await SubjectService.getOneSubjectUsingId(
            subject.id
          );
          if (!subjectData) {
            throw new Error(`Subject not found: ${subject.id}`);
          }

          const assignedFaculty = await Promise.all(
            subject.assigned_faculty.map(async (faculty_id) => {
              const faculty =
                await FacultyService.getOneFacultyByUserIdOrFacultyId(
                  faculty_id
                );
              if (!faculty) {
                throw new Error(`Faculty not found: ${faculty_id}`);
              }
              return faculty_id;
            })
          );

          return {
            id: subject.id,
            name: subjectData.name,
            code: `${data.department_id}/${data.semester}/${subject.id}`,
            type: subjectData.type,
            classes_per_week: subject.classes_per_week,
            assigned_faculty: assignedFaculty,
          };
        })
      );

      data.subjects = subjects;

      const curriculum = await CurriculumService.createNewCurriculum(data);

      new Response.Created(res)
        .setMessage("Curriculum Created Successfully")
        .setData(curriculum)
        .send();
    } catch (error) {
      console.error(
        "Error - Curriculum Controller - createNewCurriculum:",
        error.message
      );
      next(error);
    }
  };

  static updateCurriculum = async (req, res, next) => {
    try {
      const { id } = req.query;
      const data = req.body;

      // Validate department existence
      const department = await DepartmentService.getDepartmentById(
        data.department_id
      );

      // Process subjects with faculty assignments
      const subjects = await Promise.all(
        data.subjects.map(async (subject) => {
          const subjectData = await SubjectService.getOneSubjectUsingId(
            subject.id
          );
          if (!subjectData) {
            throw new Error(`Subject not found: ${subject.id}`);
          }

          const assignedFaculty = await Promise.all(
            subject.assigned_faculty.map(async (faculty_id) => {
              const faculty =
                await FacultyService.getOneFacultyByUserIdOrFacultyId(
                  faculty_id
                );
              if (!faculty) {
                throw new Error(`Faculty not found: ${faculty_id}`);
              }
              return faculty_id;
            })
          );

          return {
            id: subject.id,
            name: subjectData.name,
            code: `${data.department_id}/${data.semester}/${subject.id}`,
            type: subjectData.type,
            classes_per_week: subject.classes_per_week,
            assigned_faculty: assignedFaculty,
          };
        })
      );

      data.subjects = subjects;

      const curriculum = await CurriculumService.updateCurriculum(id, data);

      new Response.Ok(res)
        .setMessage("Curriculum Updated Successfully")
        .setData(curriculum)
        .send();
    } catch (error) {
      console.error(
        "Error - Curriculum Controller - updateCurriculum:",
        error.message
      );
      next(error);
    }
  };

  static getCurriculumById = async (req, res, next) => {
    try {
      const { id } = req.query;

      const curriculum = await CurriculumService.getCurriculumById(id);

      new Response.Ok(res)
        .setMessage("Curriculum Found Successfully")
        .setData(curriculum)
        .send();
    } catch (error) {
      console.error(
        "Error - Curriculum Controller - getCurriculumById:",
        error.message
      );
      next(error);
    }
  };

  static deleteCurriculumById = async (req, res, next) => {
    try {
      const { id } = req.query;

      const curriculum = await CurriculumService.deleteCurriculumById(id);

      new Response.Ok(res)
        .setMessage("Curriculum Deleted Successfully")
        .setData(curriculum)
        .send();
    } catch (error) {
      console.error(
        "Error - Curriculum Controller - deleteCurriculumById:",
        error.message
      );
      next(error);
    }
  };
}

module.exports = CurriculumController;

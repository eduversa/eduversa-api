const { Response } = require("../../helpers");
const { DepartmentService, CourseService } = require("../../services");

class DepartmentController {
  // Done
  static createNewDepartment = async (req, res, next) => {
    try {
      const data = req.body;
      const course = await CourseService.getCoursebyId(data.course_id);
      const department = await DepartmentService.createNewDepartment(data);
      const updatedCourse = await CourseService.addDepartmentsToCourseById(
        course.id,
        [department.id]
      );
      new Response.Created(res)
        .setMessage("Department Created successfully")
        .setData(department)
        .send();
    } catch (error) {
      console.log("Error - Department Controller - Create New Department");
      next(error);
    }
  };

  static updateDepartment = async (req, res, next) => {
    try {
      const data = req.body;
      const { id } = req.query;
      const course = await CourseService.getCoursebyId(data.course_id);
      const department = await DepartmentService.updateDepartment(id, data);
      new Response.Ok(res)
        .setMessage("Department Updated successfully")
        .setData(department)
        .send();
    } catch (error) {
      console.log("Error - Department Controller - updateDepartment");
      next(error);
    }
  };

  static getDepartmentById = async (req, res, next) => {
    try {
      const { id } = req.query;
      const department = await DepartmentService.getDepartmentById(id);
      new Response.Ok(res)
        .setMessage("Department Found successfully")
        .setData(department)
        .send();
    } catch (error) {
      console.log("Error - Department Controller - getDepartmentById");
      next(error);
    }
  };

  static deleteDepartmentById = async (req, res, next) => {
    try {
      const { id } = req.query;
      const department = await DepartmentService.deleteDepartmentById(id);
      const course = await CourseService.removeDepartmentsFromCourseById(
        department.course_id,
        [department.id]
      );
      new Response.Ok(res)
        .setMessage("Department Deleted successfully")
        .setData(department)
        .send();
    } catch (error) {
      console.log("Error - Department Controller - deleteDepartmentById");
      next(error);
    }
  };

  static getAllDepartmentsByCourseId = async (req, res, next) => {
    try {
      const { course_id } = req.query;
      const departments = await DepartmentService.getAllDepartmentsByCourseId(
        course_id
      );
      new Response.Ok(res)
        .setMessage(departments.length + " Departments Found")
        .setData(departments)
        .send();
    } catch (error) {
      console.log(
        "Error - Department Controller - getAllDepartmentsByCourseId"
      );
      next(error);
    }
  };

  static deleteAllDepartmentsByCourseId = async (req, res, next) => {
    try {
      const { course_id } = req.query;
      const departments =
        await DepartmentService.deleteAllDepartmentsByCourseId(course_id);
      new Response.Ok(res)
        .setMessage(departments.deletedCount + " Departments Deleted")
        .setData(departments)
        .send();
    } catch (error) {
      console.log(
        "Error - Department Controller - deleteAllDepartmentsByCourseId"
      );
      next(error);
    }
  };
}

module.exports = DepartmentController;

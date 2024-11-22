const { Response } = require("../../helpers");
const { CourseService, DepartmentService } = require("../../services");

class CourseController {
  static createNewCourse = async (req, res, next) => {
    try {
      const course = await CourseService.createNewCourse(req.body);
      new Response.Created(res)
        .setMessage("Course Created Successfully")
        .setData(course)
        .send();
    } catch (error) {
      console.log("Error - CourseController - createNewCourse");
      next(error);
    }
  };
  static updateCourse = async (req, res, next) => {
    try {
      const { id } = req.query;
      const course = await CourseService.updateCourse(id, req.body);
      new Response.Created(res)
        .setMessage("Course updated Successfully")
        .setData(course)
        .send();
    } catch (error) {
      console.log("Error - CourseController - updateCourse");
      next(error);
    }
  };
  static getCourseById = async (req, res, next) => {
    try {
      const { id } = req.query;
      const course = await CourseService.getCoursebyId(id);
      const departments = await DepartmentService.getAllDepartmentsByCourseId(
        course.id
      );
      new Response.Created(res)
        .setMessage("Course found Successfully")
        .setData(course)
        .setAttribute("departments", departments)
        .send();
    } catch (error) {
      console.log("Error - CourseController - getCourseById");
      next(error);
    }
  };
  static deleteCourseById = async (req, res, next) => {
    try {
      const { id } = req.query;
      const course = await CourseService.deleteCoursebyId(id);
      const departments =
        await DepartmentService.deleteAllDepartmentsByCourseId(course.id);
      new Response.Created(res)
        .setMessage("Course deleted Successfully")
        .setData(course)
        .send();
    } catch (error) {
      console.log("Error - CourseController - deleteCourseById");
      next(error);
    }
  };
}

module.exports = CourseController;

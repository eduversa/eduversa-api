const { Response } = require("../../helpers");
const { DepartmentService } = require("../../services");

class DepartmentController {
  static createNewDepartment = async (req, res, next) => {
    try {
      const data = req.body;
      const department = await DepartmentService.createNewDepartment(data);
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

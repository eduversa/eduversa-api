const { Response } = require("../../helpers");
const {
  ApplicantService,
  StudentService,
  AccountService,
} = require("../../services");
class StudentController {
  static approveStudentAdmission = async (req, res, next) => {
    try {
      const { user_id } = req.query;

      const existingApplicant = await ApplicantService.readApplicantByUserId(
        user_id
      );
      if (!existingApplicant.is_completely_filled) {
        throw new Error("Cannot Approve");
      }
      const student = await StudentService.createNewStudentFromApplicant(
        existingApplicant
      );

      await existingApplicant.delete();

      const account = await AccountService.changeAccountType(
        user_id,
        "student"
      );

      //   TODO: Send Mail
      new Response.Accepted(res)
        .setMessage("Student Approved")
        .setData(student)
        .send();
    } catch (error) {
      console.log("Error - StudentController - approveStudentAdmission");
      next(error);
    }
  };
  static findAllStudents = async (req, res, next) => {
    try {
      const students = await StudentService.getAllStudents();
      new Response.Ok(res)
        .setMessage(students.length + " Students Found")
        .setData(students)
        .send();
    } catch (error) {
      console.log("Error - StudentController - findAllStudents");
      next(error);
    }
  };
  static deleteOneStudent = async (req, res, next) => {
    try {
      const { user_id } = req.query;
      const student = await StudentService.deleteStudentUsingUserId(user_id);

      const account = await AccountService.deleteAccountByEmailOrUserId(
        user_id
      );
      new Response.Ok(res).setMessage("Student Deleted Successfully").send();
    } catch (error) {
      console.log("Error - StudentController - deleteOneStudent");
      next(error);
    }
  };
  static getOneStudent = async (req, res, next) => {
    try {
      const { user_id } = req.query;
      const student = await StudentService.getStudentUsingUserId(user_id);
      new Response.Ok(res)
        .setMessage("Student Found Successfully")
        .setData(student)
        .send();
    } catch (error) {
      console.log("Error - StudentController - getOneStudent");
      next(error);
    }
  };
}

module.exports = StudentController;

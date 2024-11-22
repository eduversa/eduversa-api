const { ROLES } = require("../../data");
const { Response } = require("../../helpers");
const { AccountService, FacultyService } = require("../../services");

class FacultyController {
  // DONE - Check TODO
  static createNewFaculty = async (req, res, next) => {
    try {
      const data = req.body;
      const { account, password } = await AccountService.createNewAccount(
        data.email,
        ROLES.FACULTY.TYPE
      );

      const facultyData = {
        user_id: account.user_id,
        personal_info: {
          first_name: data.first_name,
          middle_name: data.middle_name,
          last_name: data.last_name,
          name: data.name,
          email: account.email,
          contact: data.contact,
        },
        job_info: {
          room: data.room,
          department: data.department,
          salary: data.salary,
          designation: data.designation,
          specialization: data.specialization,
          assigned: data.assigned,
        },
      };

      const faculty = await FacultyService.createNewFaculty(facultyData);

      //   TODO: Send MAIl
      new Response.Ok(res)
        .setMessage("Faculty Created")
        .setData({ account: account, faculty })
        .send();
    } catch (error) {
      console.log("Error - FacultyController - Create new faculty");
      next(error);
    }
  };
  // Done
  static getOneFaculty = async (req, res, next) => {
    try {
      const { user_id } = req.query;
      const faculty = await FacultyService.getOneFacultyByUserIdOrFacultyId(
        user_id
      );
      new Response.Ok(res).setMessage("Faculty Found").setData(faculty).send();
    } catch (error) {
      console.log("Error - FacultyController - get one faculty");
      next(error);
    }
  };
  // Done
  static getAllFaculty = async (req, res, next) => {
    try {
      const faculties = await FacultyService.getAllFaculty();
      new Response.Ok(res)
        .setMessage(faculties.length + " Faculties Found")
        .setData(faculties)
        .send();
    } catch (error) {
      console.log("Error - FacultyController - Create All faculty");
      next(error);
    }
  };
  // Done
  static updateFaculty = async (req, res, next) => {
    try {
      let { user_id, type } = req.query;
      let data = req.body;
      if (req.file) {
        data = req.file;
      }

      const faculty = await FacultyService.updateFacultyByType(
        type,
        user_id,
        data
      );
      new Response.Created(res)
        .setMessage("Faculty updated Successfully")
        .setData(faculty)
        .send();
    } catch (error) {
      console.log("Error - FacultyController - Update faculty");
      next(error);
    }
  };
  // Done
  static deleteOneFaculty = async (req, res, next) => {
    try {
      const user_id = req.query.user_id;
      const faculty = await FacultyService.deleteFacultyByUserId(user_id);
      const account = await AccountService.deleteAccountByEmailOrUserId(
        user_id
      );
      new Response.Ok(res).setMessage("Faculty Deleted").send();
    } catch (error) {
      console.log("Error - FacultyController - Delete One faculty");
      next(error);
    }
  };
}

module.exports = FacultyController;

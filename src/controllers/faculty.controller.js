const { ROLES } = require("../data");
const { Response } = require("../helpers");
const { AccountService, FacultyService } = require("../services");

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
  // Pending
  static updateFaculty = async (req, res, next) => {
    try {
      new Response.Ok(res).setMessage("Not Implemented").send();
    } catch (error) {
      console.log("Error - FacultyController - Update faculty");
      next(error);
    }
  };
  // Pending
  static deleteOneFaculty = async (req, res, next) => {
    try {
      new Response.Ok(res).setMessage("Not Implemented").send();
    } catch (error) {
      console.log("Error - FacultyController - Delete One faculty");
      next(error);
    }
  };
}

module.exports = FacultyController;

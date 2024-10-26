const { Response } = require("../helpers");
const { ApplicantService } = require("../services");

class ApplicantController {
  // Done
  static updateApplicant = async (req, res, next) => {
    try {
      const { user_id, type } = req.query;
      let data = req.body;

      if (req.file) {
        data = req.file;
      }
      const applicant = await ApplicantService.updateApplicantByType(
        type,
        user_id,
        data
      );
      new Response.Created(res)
        .setMessage("Applicant updated Successfully")
        .setData(applicant)
        .send();
    } catch (error) {
      console.log("Error - ApplicantController - UpdateApplicant");
      next(error);
    }
  };
  // Done
  static readApplicantByUserId = async (req, res, next) => {
    try {
      const query = req.query.query;
      const applicant = await ApplicantService.readApplicantByUserId(query);

      new Response.Ok(res)
        .setMessage("Applicant Found")
        .setData(applicant)
        .send();
    } catch (error) {
      console.log("Error - ApplicantController - readApplicantByUserId");
      next(error);
    }
  };
  // Done
  static readAllApplicantsByYear = async (req, res, next) => {
    try {
      const { year } = req.query;
      const applicants = await ApplicantService.readAllApplicantsByYear(year);
      new Response.Ok(res)
        .setMessage(applicants.length + " Applicants Found")
        .setData(applicants)
        .send();
    } catch (error) {
      console.log("Error - ApplicantController - readAllApplicantsByYear");
      next(error);
    }
  };
  // Done
  static deleteApplicantByUserID = async (req, res, next) => {
    try {
      const query = req.query.query;
      const applicant = await ApplicantService.deleteApplicantByUserId(query);

      new Response.Ok(res)
        .setMessage("Applicant Deleted")
        .setData(applicant)
        .send();
    } catch (error) {
      console.log("Error - ApplicantController - deleteApplicantByUserID");
      next(error);
    }
  };
  // Done
  static deleteAllApplicantsByYear = async (req, res, next) => {
    try {
      const { year } = req.query;
      const applicants = await ApplicantService.deleteAllApplicantsByYear(year);
      new Response.Ok(res)
        .setMessage(applicants + " Applicants Deleted")
        .setData(applicants)
        .send();
    } catch (error) {
      console.log("Error - ApplicantController - deleteAllApplicantsByYear");
      next(error);
    }
  };
}

module.exports = ApplicantController;

const { Response } = require("../helpers");
const { SubjectService } = require("../services");

class SubjectController {
  static createNewSubject = async (req, res, next) => {
    try {
      const subject = await SubjectService.createSubjectUsingData(req.body);
      new Response.Ok(res)
        .setMessage("Created New Subject")
        .setData(subject)
        .send();
    } catch (error) {
      console.log("Error - Subject Controller - createNewSubject");
      next(error);
    }
  };
  static updateSubject = async (req, res, next) => {
    try {
      const { query } = req.query;
      const subject = await SubjectService.updateSubjectUsingId(
        query,
        req.body
      );
      new Response.Ok(res)
        .setMessage("Updated Subject")
        .setData(subject)
        .send();
    } catch (error) {
      console.log("Error - Subject Controller - updateSubject");
      next(error);
    }
  };
  static getOneSubject = async (req, res, next) => {
    try {
      const { query } = req.query;
      const subject = await SubjectService.getOneSubjectUsingId(query);
      new Response.Ok(res).setMessage("Subject Found").setData(subject).send();
    } catch (error) {
      console.log("Error - Subject Controller - getOneSubject");
      next(error);
    }
  };
  static getAllSubjectsFiltered = async (req, res, next) => {
    try {
      new Response.Ok(res).setMessage("No Implemented").send();
    } catch (error) {
      console.log("Error - Subject Controller - getAllSubjectsFiltered");
      next(error);
    }
  };
  static deleteOneSubject = async (req, res, next) => {
    try {
      const { query } = req.query;
      const subject = await SubjectService.deleteOneSubjectUsingId(query);
      new Response.Ok(res)
        .setMessage("Subject Deleted")
        .setData(subject)
        .send();
    } catch (error) {
      console.log("Error - Subject Controller - deleteOneSubject");
      next(error);
    }
  };
  static deleteAllSubjectsFiltered = async (req, res, next) => {
    try {
      new Response.Ok(res).setMessage("No Implemented").send();
    } catch (error) {
      console.log("Error - Subject Controller - deleteAllSubjectsFiltered");
      next(error);
    }
  };
}
module.exports = SubjectController;

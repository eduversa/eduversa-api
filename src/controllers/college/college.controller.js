const { Response } = require("../../helpers");
const { CollegeService } = require("../../services");
class CollegeController {
  static createNew = async (req, res, next) => {
    try {
      new Response.Accepted(res).setMessage("Not Implemented").send();
    } catch (error) {
      console.log("Error - CollegeController - Create New");
      next(error);
    }
  };
  static findByCollegeId = async (req, res, next) => {
    try {
      const { college_id } = req.query;
      const college = await CollegeService.readCollegeById(college_id);
      new Response.Ok(res).setMessage("Found College").setData(college).send();
    } catch (error) {
      console.log("Error - CollegeController - findByCollegeId");
      next(error);
    }
  };
  static getList = async (req, res, next) => {
    try {
      new Response.Accepted(res).setMessage("Not Implemented").send();
    } catch (error) {
      console.log("Error - CollegeController - getList");
      next(error);
    }
  };
}
module.exports = CollegeController;

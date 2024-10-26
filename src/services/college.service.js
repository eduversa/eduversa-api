const { COLLEGE } = require("../data/temp");
// TODO: Make college model and repository (Omit hardcoded data)
class CollegeService {
  static readCollegeById = async (college_id) => {
    try {
      return COLLEGE;
    } catch (error) {
      console.log("Error - CollegeService - readCollegeById");
      throw error;
    }
  };
}
module.exports = CollegeService;

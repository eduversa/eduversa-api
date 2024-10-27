const FacultyRepository = require("../repositories/faculty.repository");

class FacultyService {
  static createNewFacultyUsingAccount = async (account) => {
    try {
      const faculty = new FacultyRepository.Builder()
        .setUserId(account.user_id)
        .setPersonalInfo({
          email: account.email,
        })
        .setJobInfo({})
        .build();
      await faculty.create();
      return faculty;
    } catch (error) {
      console.log("Error - FacultyService - createNewFacultyUsingAccount");
      throw error;
    }
  };
  static createNewFaculty = async (data) => {
    try {
      const faculty = new FacultyRepository.Builder()
        .setUserId(data.user_id)
        .setPersonalInfo(data.personal_info)
        .setJobInfo(data.job_info)
        .build();
      await faculty.create();
      return faculty;
    } catch (error) {
      console.log("Error - FacultyService - createNewFaculty");
      throw error;
    }
  };
  static getOneFacultyByUserIdOrFacultyId = async (query) => {
    try {
      const faculty = new FacultyRepository().mustExist({
        $or: [{ user_id: query }, { "job_info.faculty_id": query }],
      });
      return faculty;
    } catch (error) {
      console.log("Error - FacultyService - getOneFacultyByUserIdOrFacultyId");
      throw error;
    }
  };
  static getAllFaculty = async () => {
    try {
      const faculties = new FacultyRepository().readMultiple({});
      return faculties;
    } catch (error) {
      console.log("Error - FacultyService - getAllFaculty");
      throw error;
    }
  };
}

module.exports = FacultyService;

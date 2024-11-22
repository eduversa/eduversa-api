const { StudentRepository } = require("../../repositories");

class StudentService {
  static createNewStudentFromApplicant = async (applicant) => {
    try {
      await new StudentRepository().mustNotExist({
        user_id: applicant.user_id,
      });

      const student = new StudentRepository.Builder(applicant).build();
      await student.create();
      console.log("Creating new Student");
      return student;
    } catch (error) {
      console.log("Error - StudentService - createNewStudentFromApplicant");
      throw error;
    }
  };
  static deleteStudentUsingUserId = async (user_id) => {
    try {
      const student = await new StudentRepository().mustExist({ user_id });
      await student.delete();
      return student;
    } catch (error) {
      console.log("Error - StudentService - deleteStudentUsingUserId");
      throw error;
    }
  };
  static getStudentUsingUserId = async (user_id) => {
    try {
      const student = await new StudentRepository().mustExist({ user_id });
      return student;
    } catch (error) {
      console.log("Error - StudentService - getStudentUsingUserId");
      throw error;
    }
  };
  static getAllStudents = async () => {
    try {
      const students = await new StudentRepository().readMultiple({});
      return students;
    } catch (error) {
      console.log("Error - StudentService - getAllStudents");
      throw error;
    }
  };
}
module.exports = StudentService;

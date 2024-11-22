const { FacultyRepository } = require("../../repositories");
const cloudinary = require("../../config/cloudinary.config");
const fs = require("fs");

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
  static updateFacultyByType = async (type, user_id, data) => {
    try {
      const existingFaculty = await new FacultyRepository().mustExist({
        user_id,
      });
      const facultyBuilder = new FacultyRepository.Builder(existingFaculty);
      switch (type) {
        case "personal":
          facultyBuilder.setPersonalInfo(data);
          break;

        case "job":
          facultyBuilder.setJobInfo(data);
          break;
        case "files":
          const filePath = __dirname + "/../../" + data.path;
          const fileName = data.filename;
          console.log(filePath, fileName);
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              filePath,
              { public_id: fileName },
              async (error, result) => {
                if (error) {
                  reject(error);
                }

                // Optionally, you can remove the local file after uploading
                fs.unlinkSync(filePath);
                resolve(result);
              }
            );
          });
          facultyBuilder.setImage(result.url);
          console.log("File uploaded to Cloudinary");
          break;

        default:
          throw new Error("Invalid Form Type");
          break;
      }

      const faculty = facultyBuilder.build();
      await faculty.update({ user_id });
      return faculty;
    } catch (error) {
      console.log("Error - FacultyService - updateFacultyByType");
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
  static deleteFacultyByUserId = async (user_id) => {
    try {
      const faculty = await new FacultyRepository().mustExist({ user_id });

      await faculty.delete();
      return faculty;
    } catch (error) {
      console.log("Error - FacultyService - deleteFacultyByUserId");
      throw error;
    }
  };
}

module.exports = FacultyService;

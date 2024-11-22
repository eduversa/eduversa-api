const cloudinary = require("../../config/cloudinary.config");
const fs = require("fs");
const { ApplicantRepository } = require("../../repositories");

class ApplicantService {
  static createNewApplicant = async (data) => {
    try {
      const applicant = new ApplicantRepository.Builder()
        .setImage(data.image)
        .setUserId(data.user_id)
        .setPersonalInfo(data.personal_info)
        .setCourseInfo({ admission_year: new Date().getFullYear() })
        .build();
      await applicant.create();
      return applicant;
    } catch (error) {
      console.log("Error - ApplicantService - createNewApplicant");
      throw error;
    }
  };
  static createNewApplicantUsingAccount = async (account) => {
    try {
      const applicant = new ApplicantRepository.Builder()
        .setUserId(account.user_id)
        .setPersonalInfo({
          email: account.email,
        })
        .setAcademicInfo({})
        .setFamilyInfo({})
        .setCourseInfo({ admission_year: new Date().getFullYear() })
        .build();
      await applicant.create();
      return applicant;
    } catch (error) {
      console.log("Error - ApplicantService - createNewApplicantUsingAccount");
      throw error;
    }
  };

  static updateApplicantByType = async (type, user_id, data) => {
    try {
      const existingApplicant = await new ApplicantRepository().mustExist({
        user_id,
      });

      const applicantBuilder = new ApplicantRepository.Builder(
        existingApplicant
      );
      switch (type) {
        case "personal":
          applicantBuilder.setPersonalInfo(data);
          break;
        case "academic":
          applicantBuilder.setAcademicInfo(data);
          break;
        case "family":
          applicantBuilder.setFamilyInfo(data);
          break;
        case "course":
          applicantBuilder.setCourseInfo(data);
          break;
        case "files":
          const filePath = __dirname + "/../../../" + data.path;
          const fileName = data.filename;
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
          applicantBuilder.setImage(result.url);
          console.log("File uploaded to Cloudinary");
          break;

        default:
          throw new Error("Invalid Form Type");
          break;
      }

      const applicant = applicantBuilder.build();
      if (type == "files") applicant.setIsCompletelyFilled(true);
      await applicant.update({ user_id });
      return applicant;
    } catch (error) {
      console.log("Error - ApplicantService - updateApplicantByType");
      throw error;
    }
  };

  static readAllApplicantsByYear = async (year) => {
    try {
      const applicants = await new ApplicantRepository().readMultiple({
        "course_info.admission_year": year,
      });
      return applicants;
    } catch (error) {
      console.log("Error - ApplicantService - readAllApplicantsByYear");
      throw error;
    }
  };
  static readApplicantByUserId = async (user_id) => {
    try {
      const applicant = await new ApplicantRepository().mustExist({ user_id });
      return applicant;
    } catch (error) {
      console.log("Error - ApplicantService - getApplicantByUserId");
      throw error;
    }
  };
  static deleteApplicantByUserId = async (user_id) => {
    try {
      const applicant = await new ApplicantRepository().mustExist({ user_id });

      await applicant.delete();
      return applicant;
    } catch (error) {
      console.log("Error - ApplicantService - deleteApplicantByUserId");
      throw error;
    }
  };
  static deleteAllApplicantsByYear = async (year) => {
    try {
      const applicants = await new ApplicantRepository().deleteMultiple({
        "course_info.admission_year": year,
      });
      return applicants;
    } catch (error) {
      console.log("Error - ApplicantService - readAllApplicantsByYear");
      throw error;
    }
  };
}
module.exports = ApplicantService;

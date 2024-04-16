// const Applicant = require("../classes/applicant.class");
const Account = require("../classes/account.class");
const Applicant = require("../classes/profiles/applicant.builder");
const cloudinary = require("../config/cloudinary.config");
const AccountCollection = require("../models/accounts.model");
const { ApplicantCollection } = require("../models/profile.models");

const updateApplicant = async (req, res, next) => {
  try {
    const { user_id, type } = req.query;

    const applicantData = new Applicant();
    await applicantData.findOneByUserID(user_id);
    const data = req.body;

    // const isExistingApplicant = await ApplicantCollection.findOne({ user_id });
    // if (!isExistingApplicant) {
    //   return res
    //     .status(200)
    //     .send({ status: false, message: "No applicant found" });
    // }

    // console.log(req.body)
    // const applicantData = new Applicant(req.body, type);
    // console.log(applicantData)
    let updatedApplicant = false;

    switch (type) {
      case "personal":
        applicantData.setPersonalInfo(data).updateByUserID(user_id);
        const account = new Account();
        account.setUserID(applicantData.user_id);
        await account.findOne();
        account.setFirstName(applicantData.personal_info.first_name);
        account.setLastName(applicantData.personal_info.last_name);
        if (applicantData.personal_info.middle_name) {
          account.setMiddleName(applicantData.personal_info.middle_name);
        }
        account.setPhone(applicantData.personal_info.contact);
        account.setEmail(applicantData.personal_info.email);
        await account.update();
        break;
      case "academic":
        applicantData.setAcademicInfo(data).updateByUserID(user_id);
        break;
      case "family":
        applicantData.setFamilyInfo(data).updateByUserID(user_id);
        break;
      case "course":
        applicantData.setCourseInfo(data).updateByUserID(user_id);

        break;
      case "files":
        console.log(req.file);

        const filePath = __dirname + "/../" + req.file.path;
        console.log(filePath);

        cloudinary.uploader.upload(
          filePath,
          { public_id: req.file.filename },
          async (error, result) => {
            if (error) {
              console.error("Error uploading file to Cloudinary:", error);
              return res.status(500).json({ error: "Failed to upload file" });
            }

            // `result` contains information about the uploaded file
            console.log("File uploaded to Cloudinary");

            // Optionally, you can remove the local file after uploading
            // fs.unlinkSync(filePath);

            // return res.status(200).json({ message: 'File uploaded to Cloudinary successfully' });
            applicantData.is_completely_filled = true;
            applicantData.setImage(result.url).updateByUserID(user_id);
          }
        );

        break;

      default:
        break;
    }

    // console.log(applicantData)

    res.status(200).send({
      status: true,
      message: "Applicant Updated Successfully",
      data: applicantData,
    });
  } catch (error) {
    console.log("Error in updateApplicant");
    // console.log(error);
    next(error);
    // res.send({ status: false, message: "Internal Server Error", error });
  }
};

const readApplicantByUserID = async (req, res, next) => {
  try {
    const { user_id } = req.query;

    const applicantData = new Applicant();
    await applicantData.findOneByUserID(user_id);
    // const applicantData = await ApplicantCollection.findOne({ user_id });

    // if (!applicantData) {
    //   return res
    //     .status(200)
    //     .send({ status: false, message: "No applicant found" });
    // }

    res.status(200).send({
      status: true,
      message: "Applcant Data Found",
      data: applicantData,
    });
  } catch (error) {
    console.log("Error in readApplicantByUserID");
    next(error);
    // console.log(error);
    // res.send({ status: false, message: "catch error", error });
  }
};

const readAllApplicantsByYear = async (req, res) => {
  try {
    const year = req.query.year;
    // const year = new Date().getFullYear();

    const applicantArray = await ApplicantCollection.find({
      "course_info.admission_year": year,
    });

    if (!applicantArray || applicantArray.length < 1) {
      return res
        .status(200)
        .send({ status: false, message: "No Applicant Found", data: [] });
    }

    res.status(200).send({
      status: true,
      message: applicantArray.length + " Applicant(s) Found",
      data: applicantArray,
    });
  } catch (error) {
    console.log("Error in readAllApplicantsByYear");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const deleteApplicantByUserID = async (req, res) => {
  try {
    const { user_id } = req.query;

    const applicant = new Applicant();
    applicant.setUserID(user_id);
    await applicant.delete();

    const account = new Account();
    await account.delete(user_id);

    // const applicantData = await ApplicantCollection.findOne({ user_id });
    // console.log("1")

    // if (!applicantData) {
    //   // console.log("1a")
    //   return res
    //     .status(200)
    //     .send({ status: false, message: "No applicant found" });
    // }
    // // console.log("2")

    // const deletedApplicant = await ApplicantCollection.findOneAndDelete({
    //   user_id,
    // });
    // console.log("3")

    // const deletedAccount = await AccountCollection.findOneAndDelete({
    //   user_id,
    // });
    // console.log("4")

    res.status(200).send({
      status: true,
      message: "Applicant Deleted",
      data: applicant,
    });
  } catch (error) {
    console.log("Error in deleteApplicantByUserID");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const deleteAllApplicantsByYear = async (req, res) => {
  try {
    // const year = req.query.year;
    const year = new Date().getFullYear();

    const applicantArray = await ApplicantCollection.find({
      "course_info.admission_year": year,
    });

    if (!applicantArray || applicantArray.length < 1) {
      return res
        .status(200)
        .send({ status: false, message: "No Applicant Found", data: [] });
    }

    const deletedArray = await Promise.all(
      applicantArray.map(async (applicant) => {
        const deletedApplicant = await ApplicantCollection.findOneAndDelete({
          user_id: applicant.user_id,
        });
        const deletedAccount = await AccountCollection.findOneAndDelete({
          user_id: applicant.user_id,
        });

        return deletedApplicant;
      })
    );

    res.status(200).send({
      status: true,
      message: deletedArray.length + " Applicant(s) Found",
      data: deletedArray,
    });
  } catch (error) {
    console.log("Error in deleteAllApplicantsByYear");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

module.exports = {
  updateApplicant,
  readApplicantByUserID,
  readAllApplicantsByYear,
  deleteApplicantByUserID,
  deleteAllApplicantsByYear,
};

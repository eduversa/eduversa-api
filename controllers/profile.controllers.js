const Applicant = require("../classes/applicant.class");
const AccountCollection = require("../models/accounts.model");
const { ApplicantCollection } = require("../models/profile.models");

const updateApplicant = async (req, res) => {
  try {
    const { user_id, type } = req.query;

    const isExistingApplicant = await ApplicantCollection.findOne({ user_id });
    if (!isExistingApplicant) {
      return res
        .status(200)
        .send({ status: false, message: "No applicant found" });
    }

    const applicantData = new Applicant(req.body, type);
    // console.log(applicantData)
    let updatedApplicant = false;

    switch (type) {
      case "personal":
        updatedApplicant = await ApplicantCollection.findOneAndUpdate(
          { user_id },
          { personal_info: applicantData.personal_info },
          { new: true }
        );

        const updatedAccount = await AccountCollection.findOneAndUpdate(
          { user_id },
          {
            first_name: applicantData.personal_info.first_name,
            middle_name: applicantData.personal_info.middle_name,
            last_name: applicantData.personal_info.last_name,
            phone: applicantData.personal_info.contact,
          },
          {new: true}
        );
        console.log(updatedAccount)
        break;
      case "academic":
        updatedApplicant = await ApplicantCollection.findOneAndUpdate(
          { user_id },
          { academic_info: applicantData.academic_info },
          { new: true }
        );
        break;
      case "family":
        updatedApplicant = await ApplicantCollection.findOneAndUpdate(
          { user_id },
          { family_info: applicantData.family_info },
          { new: true }
        );
        break;
      case "course":
        updatedApplicant = await ApplicantCollection.findOneAndUpdate(
          { user_id },
          { course_info: applicantData.course_info },
          { new: true }
        );
        break;
      case "files":
        console.log(req.file)
        updatedApplicant = await ApplicantCollection.findOneAndUpdate(
          { user_id },
          { course_info: applicantData.course_info },
          { new: true }
        );
        break;

      default:
        break;
    }

    // console.log(applicantData)

    res.status(200).send({
      status: true,
      message: "Applicant Updated Successfully",
      data: updatedApplicant,
    });
  } catch (error) {
    console.log("Error in updateApplicant");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const readApplicantByUserID = async (req, res) => {
  try {
    const { user_id } = req.query;

    const applicantData = await ApplicantCollection.findOne({ user_id });

    if (!applicantData) {
      return res
        .status(200)
        .send({ status: false, message: "No applicant found" });
    }

    res.status(200).send({
      status: true,
      message: "Applcant Data Found",
      data: applicantData,
    });
  } catch (error) {
    console.log("Error in readApplicantByUserID");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const readAllApplicantsByYear = async (req, res) => {
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

    const applicantData = await ApplicantCollection.findOne({ user_id });

    if (!applicantData) {
      return res
        .status(200)
        .send({ status: false, message: "No applicant found" });
    }

    const deletedApplicant = await ApplicantCollection.findOneAndDelete({ user_id });
    const deletedAccount = await AccountCollection.findOneAndDelete({ user_id });

    res.status(200).send({
      status: true,
      message: "Applicant Deleted",
      data: deletedApplicant,
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

    const deletedArray = await Promise.all(applicantArray.map(async applicant=>{
        const deletedApplicant = await ApplicantCollection.findOneAndDelete({user_id: applicant.user_id})
        const deletedAccount = await AccountCollection.findOneAndDelete({user_id: applicant.user_id})

        return deletedApplicant
    }))

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

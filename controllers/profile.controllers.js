const Applicant = require("../classes/applicant.class");
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
        const {
          name,
          gender,
          dob,
          present_address,
          permanent_address,
          email,
          contact,
          category,
          blood_group,
          aadhar_number,
          pan_number,
        } = data;
        applicantData
          .setName(name)
          .setGender(gender)
          .setDOB(dob)
          .setAddress("present", present_address)
          .setAddress("permanent", permanent_address)
          .areAddressesSame()
          .setEmail("personal", email)
          .setContact("personal", contact)
          .setCategory(category)
          .setBloodGroup(blood_group)
          .setAadharNumber("personal", aadhar_number)
          .setPanNumber("personal", pan_number);

        applicantData.updateByUserID(user_id);
        // updatedApplicant = await ApplicantCollection.findOneAndUpdate(
        //   { user_id },
        //   { personal_info: applicantData.personal_info },
        //   { new: true }
        // );

        // const updatedAccount = await AccountCollection.findOneAndUpdate(
        //   { user_id },
        //   {
        //     first_name: applicantData.personal_info.first_name,
        //     middle_name: applicantData.personal_info.middle_name,
        //     last_name: applicantData.personal_info.last_name,
        //     phone: applicantData.personal_info.contact,
        //   },
        //   { new: true }
        // );
        // console.log(updatedAccount);
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
            updatedApplicant = await ApplicantCollection.findOneAndUpdate(
              { user_id },
              { image: result.url },
              { new: true }
            );
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
    // console.log("1")

    if (!applicantData) {
      // console.log("1a")
      return res
        .status(200)
        .send({ status: false, message: "No applicant found" });
    }
    // console.log("2")

    const deletedApplicant = await ApplicantCollection.findOneAndDelete({
      user_id,
    });
    // console.log("3")

    const deletedAccount = await AccountCollection.findOneAndDelete({
      user_id,
    });
    // console.log("4")

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

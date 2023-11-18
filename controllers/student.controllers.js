const { sendEmail } = require("../config/nodemailer.config");
const AccountCollection = require("../models/accounts.model");
const {
  StudentCollection,
  ApplicantCollection,
} = require("../models/profile.models");

const approveStudentAdmission = async (req, res) => {
  try {
    const { user_id } = req.query;

    const isExistingStudent = await StudentCollection.findOne({ user_id });
    if (isExistingStudent) {
      return res
        .status(200)
        .send({ status: false, message: "Existing Student" });
    }

    const applicantData = await ApplicantCollection.findOne({ user_id });
    if (!applicantData) {
      return res
        .status(200)
        .send({ status: false, message: "No Such Applicant" });
    }

    const newStudent = new StudentCollection({
      user_id: `1${applicantData.user_id}`,
      image: applicantData.image,
      personal_info: applicantData.personal_info,
      academic_info: applicantData.academic_info,
      family_info: applicantData.family_info,
      course_info: {
        ...applicantData.course_info,
        section: "A",
        total_sem: this.duration * 2,
        current_sem: "1",
        current_year: "1",
        passout_year: this.admission_year + this.duration,
        enrollment_number: `1${applicantData.user_id}`,
        registration_number: `304${applicantData.user_id}`,
      },
    });

    //red-f// Write a function to generate Enrollment Number and Registration Number

    const addedStudent = await newStudent.save();
    console.log(addedStudent);

    const deletedApplicant = await ApplicantCollection.findOneAndDelete({
      user_id,
    });

    const updatedAccount = await AccountCollection.findOneAndUpdate(
      { user_id },
      { user_id: addedStudent.course_info.enrollment_number, type: "student" }
    );

    const emailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: updatedAccount.email,
      subject: "New User ID for your EduVersa Account",
      text: `User ID: ${updatedAccount.user_id}`,
    };
    console.log(emailOptions);
    sendEmail(emailOptions);
    res.status(200).send({ status: true, message: "Applicant Approved" });
  } catch (error) {
    console.log("Error in createNewStudent");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

module.exports = { approveStudentAdmission };

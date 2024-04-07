const Applicant = require("../classes/profiles/applicant.builder");
const Student = require("../classes/profiles/student.builder");
const { sendEmail } = require("../config/nodemailer.config");
const AccountCollection = require("../models/accounts.model");
const {
  StudentCollection,
  ApplicantCollection,
} = require("../models/profile.models");

const jwt = require("jsonwebtoken");

const approveStudentAdmission = async (req, res) => {
  try {
    const { user_id } = req.query;

    const student = new Student();
    if (await student.findOneByStudentID(user_id)) {
      return res
        .status(200)
        .send({ status: false, message: "Existing Student" });
    }

    // const isExistingStudent = await StudentCollection.findOne({ user_id });
    // if (isExistingStudent) {
    // }

    const applicant = new Applicant();

    // const applicantData = await ApplicantCollection.findOne({ user_id });
    if (!(await applicant.findOneByUserID(user_id))) {
      return res
        .status(200)
        .send({ status: false, message: "No Such Applicant" });
    }

    student
      .fromApplicant(applicant)
      .setUserID(`1${applicant.user_id}`)
      .setCourseInfo(applicant.course_info)
      .setEnrollmentNumber(`1${applicant.user_id}`)
      .setRegistrationNumber(`304${applicant.user_id}`);

    await student.create();

    //red-f// Write a function to generate Enrollment Number and Registration Number

    // const addedStudent = await newStudent.save();
    // console.log(addedStudent);

    const deletedApplicant = await ApplicantCollection.findOneAndDelete({
      user_id: user_id,
    });
    console.log(deletedApplicant);
    const updatedAccount = await AccountCollection.findOneAndUpdate(
      { user_id },
      {
        security_token: jwt.sign(
          {
            user_id: student.user_id,
            type: "student",
          },
          process.env.SECURITY_KEY
        ),
        user_id: student.user_id,
        type: "student",
        accessLevel: 2,
        tokens: [],
      },
      { new: true }
    );
    console.log(updatedAccount);

    // const emailOptions = {
    //   from: process.env.GMAIL_EMAIL,
    //   to: updatedAccount.email,
    //   subject: "New User ID for your EduVersa Account",
    //   text: `User ID: ${updatedAccount.user_id}`,
    // };
    // // console.log(emailOptions);
    // sendEmail(emailOptions);
    res
      .status(200)
      .send({ status: true, message: "Applicant Approved", data: student });
  } catch (error) {
    console.log("Error in createNewStudent");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

const findAllStudents = async (req, res) => {
  try {
    const studentArray = await StudentCollection.find({});
    res.status(200).send({
      status: true,
      message: `${studentArray.length} Students Found`,
      data: studentArray,
    });
  } catch (error) {
    console.log("Error in findAllStudents");
    console.log(error);
    res.send({ status: false, message: error });
  }
};

module.exports = { approveStudentAdmission, findAllStudents };

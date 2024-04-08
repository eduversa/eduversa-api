const express = require("express");
const {
  approveStudentAdmission,
  findAllStudents,
  deleteOneStudent,
  getOneStudent,
} = require("../controllers/student.controllers");

const studentRouter = express.Router();

studentRouter.get("/test", (req, res) => {
  res.send("This Router is working");
});

studentRouter.route("/").get(getOneStudent).delete(deleteOneStudent);

studentRouter.route("/approve").post(approveStudentAdmission);
studentRouter.route("/find/all").get(findAllStudents);

studentRouter.get("/help", (req, res) => {
  res.status(200).send({
    status: "This route is working",
    data: [
      {
        method: "POST",
        route: "/student/approve?user_id={{user_id}}",
        desc: "creates new student, email sent, deletes applicant, updates account",
        NOTE: "this function changes the user_id and account type",
      },
      {
        method: "GET",
        route: "/student/find/all",
        desc: "gets all the student data into an array",
      },
      {
        method: "GET",
        route: "/student/?user_id={{user_id}}",
        desc: "gets one student",
      },
      {
        method: "DELETE",
        route: "/student/?user_id={{user_id}}",
        desc: "deletes one student",
      },
    ],
  });
});

module.exports = studentRouter;

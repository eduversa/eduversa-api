const { StudentController } = require("../controllers");
const BaseRouter = require("./BASE.router");

class StudentRouter extends BaseRouter {
  configure() {
    this.router.get("/test", (req, res) => {
      res.send("This Router is working");
    });

    // Route - /
    this.router.get("/", StudentController.getOneStudent);
    this.router.delete("/", StudentController.deleteOneStudent);
    // Route - /approve
    this.router.post("/approve", StudentController.approveStudentAdmission);
    // Route - /find/all
    this.router.get("/find/all", StudentController.findAllStudents);

    this.router.get("/help", (req, res) => {
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

    return this;
  }
}
module.exports = StudentRouter;

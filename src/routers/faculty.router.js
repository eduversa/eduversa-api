const FacultyController = require("../controllers/faculty.controller");
const BaseRouter = require("./BASE.router");
class FacultyRouter extends BaseRouter {
  configure() {
    this.router.get("/test", (req, res) => {
      res.send("This Router is Working");
    });

    // get one faculty
    this.router.get("/", FacultyController.getOneFaculty);
    // update faculty
    this.router.put("/", FacultyController.updateFaculty);
    // create faculty
    this.router.post("/", FacultyController.createNewFaculty);
    // delete faculty
    this.router.delete("/", FacultyController.deleteOneFaculty);
    // get all faculty
    this.router.get("/all", FacultyController.getAllFaculty);

    this.router.get("/help", (req, res) => {
      res.status(200).send({
        status: "This route is working",
        data: [
          {
            method: "POST",
            route: "/faculty",
            desc: "creates a faculty profile and also a faculty account",
            info: [
              {
                body: [
                  "email",
                  "name",
                  "contact",
                  "room",
                  "department",
                  "salary",
                  "designation",
                  "specialization",
                ],
              },
            ],
          },
          {
            method: "GET",
            route: "/faculty/?user_id={{user_id}}",
            desc: "get single faculty by user_id",
          },
          {
            method: "GET",
            route: "/faculty/all",
            desc: "get all faculty",
          },
        ],
      });
    });
    return this;
  }
}

module.exports = FacultyRouter;

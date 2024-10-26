const { CollegeController } = require("../controllers");
const BaseRouter = require("./BASE.router");
class CollegeRouter extends BaseRouter {
  configure() {
    this.router.post("/", CollegeController.createNew);

    this.router.get("/", CollegeController.findByCollegeId);

    this.router.get("/list", CollegeController.getList);

    this.router.get("/help", (req, res) => {
      res.status(200).send({
        status: "This route is working",
        data: [
          {
            method: "GET",
            route: "/college/?college_id={{college_id}}",
            desc: "gets the details about the corresponding college",
            NOTE: "use this function to get the data for the dropdowns in the profile form",
          },
        ],
      });
    });
    return this;
  }
}

module.exports = CollegeRouter;

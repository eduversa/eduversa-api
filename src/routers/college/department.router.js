const { DepartmentController } = require("../../controllers");
const { Response } = require("../../helpers");
const BaseRouter = require("../BASE.router");

class DepartmentRouter extends BaseRouter {
  configure() {
    this.router.get("/test", (req, res) => {
      new Response.Ok(res).setMessage("This router is Working").send();
    });

    // Route - /
    this.router.post("/", DepartmentController.createNewDepartment);
    this.router.get("/", DepartmentController.getDepartmentById);
    this.router.put("/", DepartmentController.updateDepartment);
    this.router.delete("/", DepartmentController.deleteDepartmentById);

    // Route - /multiple
    this.router.get(
      "/multiple",
      DepartmentController.getAllDepartmentsByCourseId
    );
    this.router.delete(
      "/multiple",
      DepartmentController.deleteAllDepartmentsByCourseId
    );

    return this;
  }
}

module.exports = DepartmentRouter;

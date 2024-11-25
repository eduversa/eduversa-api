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

    this.router.get("/help", (req, res) => {
      new Response.Ok(res)
        .setMessage([
          {
            method: "POST",
            route: "/department",
            desc: "Creates a new department",
            body: {
              name: String,
              streams: [{ name: String }],
              course_id: String,
              hod: String("user_id of the faculty"),
            },
          },
          {
            method: "PUT",
            route: "/department?id={{department_id}}",
            desc: "Updates a department",
            body: {
              name: String,
              streams: [{ name: String }],
              course_id: String,
              hod: String("user_id of the faculty"),
            },
          },
          {
            method: "GET",
            route: "/department?id={{department_id}}",
            desc: "Get a department",
          },
          {
            method: "DELETE",
            route: "/department?id={{department_id}}",
            desc: "Delete a department",
          },
          {
            method: "GET",
            route: "/department/multiple?course_id={{department_id}}",
            desc: "Get All Departments in a course",
          },
          {
            method: "DELETE",
            route: "/department/multiple?course_id={{department_id}}",
            desc: "Delete All Departments in a course",
          },
        ])

        .send();
    });

    return this;
  }
}

module.exports = DepartmentRouter;

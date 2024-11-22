const { CourseController } = require("../../controllers");
const { Response } = require("../../helpers");
const BaseRouter = require("../BASE.router");

class CourseRouter extends BaseRouter {
  configure() {
    this.router.get("/test", (req, res) => {
      new Response.Ok(res).setMessage("This router is working").send();
    });

    // Route - /
    this.router.get("/", CourseController.getCourseById);
    this.router.put("/", CourseController.updateCourse);
    this.router.post("/", CourseController.createNewCourse);
    this.router.delete("/", CourseController.deleteCourseById);

    // Route - /all
    this.router.get("/all");
    this.router.delete("/all");

    this.router.get("/help", (req, res) => {
      new Response.Ok(res).setMessage(
        JSON.stringify([
          {
            method: "POST",
            route: "/course",
            desc: "Creates a new course",
            body: {
              name: String,
              departments: [String],
              fees: Number,
              duration: Number,
            },
          },
          {
            method: "PUT",
            route: "/course?id={{course_id}}",
            desc: "Updates a course",
            body: {
              name: String,
              departments: [String],
              fees: Number,
              duration: Number,
            },
          },
          {
            method: "GET",
            route: "/course?id={{course_id}}",
            desc: "Get a course",
          },
          {
            method: "DELETE",
            route: "/course?id={{course_id}}",
            desc: "Delete a course",
          },
        ])
      );
    });
    return this;
  }
}

module.exports = CourseRouter;

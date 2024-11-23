const { CurriculumController } = require("../../controllers");
const { Response } = require("../../helpers");
const BaseRouter = require("../BASE.router");
class CurriculumRouter extends BaseRouter {
  configure() {
    this.router.get("/test", (req, res) => {
      new Response.Ok(res).setMessage("This ROuter is Working").send();
    });

    // Route - /
    this.router.get("/", CurriculumController.getCurriculumById);
    this.router.post("/", CurriculumController.createNewCurriculum);
    this.router.put("/", CurriculumController.updateCurriculum);
    this.router.delete("/", CurriculumController.deleteCurriculumById);

    this.router.get("/help", (req, res) => {
      new Response.Ok(res)
        .setMessage(
          JSON.stringify([
            {
              method: "POST",
              route: "/curriculum",
              desc: "Creates a new Curriculum",
              body: {
                passout_year: Number,
                department_id: String,
                semester: Number,
                subjects: [
                  {
                    id: String,
                    assigned_faculty: [String("Faculty_Id")],
                    classes_per_week: Number,
                  },
                ],
              },
            },
            {
              method: "PUT",
              route: "/curriculum?id={{curriculum_id}}",
              desc: "Updates a Curriculum",
              body: {
                passout_year: Number,
                department_id: String,
                semester: Number,
                subjects: [
                  {
                    id: String,
                    assigned_faculty: [String("Faculty_Id")],
                    classes_per_week: Number,
                  },
                ],
              },
            },
            {
              method: "GET",
              route: "/curriculum?id={{curriculum_id}}",
              desc: "Get a curriculum",
            },
            {
              method: "DELETE",
              route: "/curriculum?id={{curriculum_id}}",
              desc: "Delete a curriculum",
            },
          ])
        )
        .send();
    });
    return this;
  }
}

module.exports = CurriculumRouter;

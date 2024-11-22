const { SubjectController } = require("../../controllers");
const BaseRouter = require("../BASE.router");

class SubjectRouter extends BaseRouter {
  configure() {
    this.router.get("/test", (req, res) => {
      res.send("This Router is working");
    });

    this.router.get("/", SubjectController.getOneSubject);
    this.router.post("/", SubjectController.createNewSubject);
    this.router.put("/", SubjectController.updateSubject);
    this.router.delete("/", SubjectController.deleteOneSubject);

    this.router.get("/filtered", SubjectController.getAllSubjectsFiltered);
    this.router.delete(
      "/filtered",
      SubjectController.deleteAllSubjectsFiltered
    );

    this.router.get("/help", (req, res) => {
      res.status(200).send([
        {
          method: "POST",
          route: "/subject",
          desc: "create new subject",
          body: ["name", "course", "stream", "type"],
        },
        {
          method: "PUT",
          route: "/subject?query={{id}}",
          desc: "Update subject",
          body: ["name", "course", "stream", "type"],
        },
        {
          method: "GET",
          route: "/subject?query={{id}}",
          desc: "get one subject",
        },
        {
          method: "DELETE",
          route: "/subject?query={{id}}",
          desc: "delete one subject",
        },
      ]);
    });
    return this;
  }
}

module.exports = SubjectRouter;

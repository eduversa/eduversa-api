const { FacultyController } = require("../../controllers");
const { FileUploader } = require("../../middlewares");
const BaseRouter = require("../BASE.router");

class FacultyRouter extends BaseRouter {
  configure() {
    this.router.get("/test", (req, res) => {
      res.send("This Router is Working");
    });

    // get one faculty
    this.router.get("/", FacultyController.getOneFaculty);
    // update faculty
    this.router.put(
      "/",
      FileUploader.profileImage.single("image"),
      FacultyController.updateFaculty
    );
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
            method: "DELETE",
            route: "/faculty/?user_id={{user_id}}",
            desc: "Delete single faculty by user_id",
          },
          {
            method: "GET",
            route: "/faculty/all",
            desc: "get all faculty",
          },

          {
            method: "PUT",
            route:
              "/faculty/?user_id={{user_id}}&type={{(Any One)->[personal, job, files]}}",
            desc: "updates the faculty data based on the section of the profile form",
            NOTE: "Give an object based on the type of profile data, for image-> {image: <imageData>}",
            info: [
              {
                type: "personal",
                body: [
                  "name",
                  "gender",
                  "dob",
                  "present_address->street, pincode, city, district, state",
                  "permanent_address->street, pincode, city, district, state",
                  "are_addresses_same",
                  "email",
                  "contact",
                  "category",
                  "blood_group",
                  "aadhar_number",
                  "pan_number",
                ],
              },
              {
                type: "job",
                body: [
                  "faculty_id",
                  "room",
                  "specialization",
                  "assigned",
                  "department",
                  "joined",
                  "salary",
                  "designation",
                ],
              },
            ],
          },
        ],
      });
    });
    return this;
  }
}

module.exports = FacultyRouter;

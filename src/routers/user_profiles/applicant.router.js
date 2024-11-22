const { ApplicantController } = require("../../controllers");
const { FileUploader, Authentication } = require("../../middlewares");
const BaseRouter = require("../BASE.router");

// TODO: Add Auth Check and Permission Checks
class ApplicantRouter extends BaseRouter {
  configure() {
    this.router.get("/test", (req, res) => {
      res.send("This Router is working");
    });
    // Route - /
    this.router.put(
      "/",
      Authentication.isLoggedIn,
      FileUploader.profileImage.single("image"),
      ApplicantController.updateApplicant
    );
    this.router.get(
      "/",
      Authentication.isLoggedIn,
      ApplicantController.readApplicantByUserId
    );
    this.router.delete(
      "/",
      Authentication.isLoggedIn,
      ApplicantController.deleteApplicantByUserID
    );

    // Route - /year
    this.router.get(
      "/year",
      Authentication.isLoggedIn,
      Authentication.adminAndAbove(""),
      ApplicantController.readAllApplicantsByYear
    );
    this.router.delete(
      "/year",
      Authentication.isLoggedIn,
      Authentication.adminAndAbove(""),
      ApplicantController.deleteAllApplicantsByYear
    );

    // Route - /help
    this.router.get("/help", (req, res) => {
      res.status(200).send({
        status: "This route is working",
        data: [
          {
            method: "PUT",
            route:
              "/applicant/?user_id={{user_id}}&type={{(Any One)->[personal, academic, family, course, files]}}",
            desc: "updates the applicant data based on the section of the profile form",
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
                type: "academic",
                body: [],
              },
            ],
          },
          {
            method: "GET",
            route: "/applicant/?user_id={{user_id}}",
            desc: "get single applicant by user_id",
          },
          {
            method: "GET",
            route: "/applicant/year?year={{year}}",
            desc: "get all applicants for that year",
          },
          {
            method: "DELETE",
            route: "/applicant/?user_id={{user_id}}",
            desc: "delete applicant by user_id (also deletes the account)",
          },
          {
            method: "DELETE",
            route: "/applicant/year?year={{year}}",
            desc: "delete all applicants for that year (also deletes the account)",
          },
        ],
      });
    });
    return this;
  }
}

module.exports = ApplicantRouter;

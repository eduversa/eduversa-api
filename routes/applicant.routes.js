const express = require("express");
const {
  updateApplicant,
  readApplicantByUserID,
  readAllApplicantsByYear,
  deleteApplicantByUserID,
  deleteAllApplicantsByYear,
} = require("../controllers/profile.controllers");
const { profileImageUploader } = require("../config/multer.config");
const {
  isAuthorizedAccess,
  checkPermission,
} = require("../middlewares/auth.middlewares");

const applicantRouter = express.Router();

applicantRouter.get("/test", (req, res) => {
  res.send("This Router is working");
});

applicantRouter
  .route("/")
  .put(
    // isAuthorizedAccess,
    // checkPermission("applicant profile update", 1),
    profileImageUploader.single("image"),
    updateApplicant
  )
  .get(
    // isAuthorizedAccess,
    // checkPermission("single applicant profile read", 1),
    readApplicantByUserID
  )
  .delete(
    isAuthorizedAccess,
    checkPermission("single applicant profile delete", 4),
    deleteApplicantByUserID
  );
applicantRouter
  .route("/year")
  .get(
    isAuthorizedAccess,
    checkPermission("multiple applicant profiles read", 4),
    readAllApplicantsByYear
  )
  .delete(
    isAuthorizedAccess,
    checkPermission("multiple applicant profiles delete", 4),
    deleteAllApplicantsByYear
  );

applicantRouter.get("/help", (req, res) => {
  res.status(200).send({
    status: "This route is working",
    data: [
      {
        method: "PUT",
        route:
          "/applicant/?user_id={{user_id}}&type={{(Any One)->[personal, academic, family, course, files]}}&email={{email}}",
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

//green-u// Update Applicant
//green-u// Read Applicant by user_id
//green-u// Read all Applicants by year
//blue-u// Read all Applicants by condition (course, stream)
//green-u// Delete applicant by user_id
//green-u// Delete all applicant by year

module.exports = applicantRouter;

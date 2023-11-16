const express = require("express");
const { updateApplicant } = require("../controllers/profile.controllers");

const applicantRouter = express.Router();

applicantRouter.get("/test", (req, res)=>{
    res.send("This Router is working")
})


applicantRouter.route("/").put(updateApplicant)


module.exports = applicantRouter
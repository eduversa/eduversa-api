const express = require('express');
// const { checkSchema } = require('express-validator');
const { createNewCollege, findCollegeByCollegeID, getCollegeList } = require('../controllers/college.controllers');
const collegeRouter = express.Router()
// const { isValidAdmin, isValidUser } = require('../middlewares/auth.middleware');


//yellow-f// Base Route: "/account" 
//yellow-f// Sample URL: http://localhost:9000/account 


//orange-u// Done
//orange-u// Tested and Connected
collegeRouter.post("/", createNewCollege);

collegeRouter.get("/", findCollegeByCollegeID);
collegeRouter.get("/list", getCollegeList);




collegeRouter.get("/help", (req, res) => {
    res.status(200).send({
      status: "This route is working",
      data: [
        {
          method: "GET",
          route: "/college/?college_id={{college_id}}",
          desc: "gets the details about the corresponding college",
          NOTE: "use this function to get the data for the dropdowns in the profile form"
        },
        
      ],
    });
  });


module.exports = collegeRouter;
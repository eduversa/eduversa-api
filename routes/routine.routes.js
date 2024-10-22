const express = require("express");
const { createNewRoutine, getRoutine } = require("../controllers/routine.contollers");

const routineRouter = express.Router();

/**
 * @swagger
 * /routine/test:
 *   get:   
 *     summary: Test the URL
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
routineRouter.get("/test", (req, res)=>{
    res.send("This Routine Router is working")
})

routineRouter.post("/", createNewRoutine)
routineRouter.get("/", getRoutine)



module.exports = routineRouter
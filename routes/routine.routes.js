const express = require("express");
const { createNewRoutine } = require("../controllers/routine.contollers");

const routineRouter = express.Router();

routineRouter.get("/test", (req, res)=>{
    res.send("This Routine Router is working")
})

routineRouter.post("/", createNewRoutine)



module.exports = routineRouter
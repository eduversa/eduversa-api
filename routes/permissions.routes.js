const express = require("express");
const { getPermissionByName, createNewPermission, getAllPermissions, addNewPermissionToUser, removePermissionFromUser } = require("../controllers/permissions.controllers");

const permissionRouter = express.Router();

permissionRouter.get("/test", (req, res)=>{
    res.send("This Router is working")
})

permissionRouter.route("/").get(getPermissionByName).post(createNewPermission);
permissionRouter.route("/all").get(getAllPermissions)
permissionRouter.route("/account").post(addNewPermissionToUser).put(removePermissionFromUser)


module.exports = permissionRouter
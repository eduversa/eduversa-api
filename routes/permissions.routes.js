const express = require("express");
const {
  getPermissionByName,
  createNewPermission,
  getAllPermissions,
  addNewPermissionToUser,
  removePermissionFromUser,
} = require("../controllers/permissions.controllers");

const permissionRouter = express.Router();

permissionRouter.get("/test", (req, res) => {
  res.send("This Router is working");
});

permissionRouter.route("/").get(getPermissionByName).post(createNewPermission);
permissionRouter.route("/all").get(getAllPermissions);
permissionRouter
  .route("/account")
  .post(addNewPermissionToUser)
  .put(removePermissionFromUser);

permissionRouter.get("/help", (req, res) => {
  res.status(200).send({
    status: "This route is working",
    data: [
      {
        method: "GET",
        route: "/permission/all",
        desc: "get a list of all permissions",
      },
      {
        method: "POST",
        route:
          "/permission/account?user_id={{USER_ID}}&permission_code={{PERMISSION.CODE}}",
        desc: "adds the corresponding permission to the permissions array of the given user_id",
      },
      {
        method: "PUT",
        route:
          "/permission/account?user_id={{USER_ID}}&permission_code={{PERMISSION.CODE}}",
        desc: "removes the corresponding permission from the permissions array of the given user_id",
      },
    ],
  });
});

module.exports = permissionRouter;

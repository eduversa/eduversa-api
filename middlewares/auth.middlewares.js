const jwt = require("jsonwebtoken");
const AccountCollection = require("../models/accounts.model");
const PermissionsCollection = require("../models/permissions.model");

const isAuthorizedAccess = async (req, res, next) => {
  try {
    // const { user_id } = req.query;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(200).send({ status: false, message: "No Token Error" });
    }
    const accountData = await AccountCollection.findOne({
      "tokens.token": token,
    });
    if (!accountData) {
      return res
        .status(200)
        .send({ status: false, message: "Invalid Token Error" });
    }

    const tokenData = jwt.verify(token, process.env.SECRET_KEY);

    if (accountData.user_id !== tokenData.user_id) {
      return res
        .status(200)
        .send({ status: false, message: "Unauthorized Access Error" });
    }

    req.user = accountData;
    next();
  } catch (error) {
    console.log("Error in isAuthorizedAccess");
    console.log(error);
  }
};

const checkPermission = (permission, accessLevel = 4) => {
  return async (req, res, next) => {
    const { user } = req;
    // console.log(user)
    // if (user) {}

    if(user.accessLevel>=accessLevel){
      next();
      return
    }
    const permissionData = await PermissionsCollection.findOne({name: permission})
    if(user.permissions.includes(permissionData.code)){
      next()
      return
    } 
    res.status(200).send({status: false, message: "Access Not Allowed"})


  };
};

module.exports = { isAuthorizedAccess, checkPermission };

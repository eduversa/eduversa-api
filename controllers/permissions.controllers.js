const { generatePermissionCode } = require("../functions/random.functions");
const AccountCollection = require("../models/accounts.model");
const PermissionsCollection = require("../models/permissions.model");

const createNewPermission = async (req, res) => {
  try {
    const { name, desc } = req.body;

    const code = generatePermissionCode();

    const isExistingPermission = await PermissionsCollection.findOne({
      name: name,
    });
    if (isExistingPermission) {
      return res
        .status(200)
        .send({ status: false, message: "Permission Already Exists" });
    }

    const newPermission = new PermissionsCollection({ name, code, desc });
    const addedPermission = await newPermission.save();

    res.status(200).send({
      status: true,
      message: "Permission created successfully",
      data: addedPermission,
    });
  } catch (error) {
    console.log("Error in createNewPermission");
    res.send({ status: false, message: error });
  }
};

const getPermissionByName = async (req, res) => {
  try {
    const { name } = req.query;

    // const code = generatePermissionCode();

    const isExistingPermission = await PermissionsCollection.findOne({
      name: name,
    });
    if (!isExistingPermission) {
      return res
        .status(200)
        .send({ status: false, message: "Permission Does Not Exist" });
    }

    res.status(200).send({
      status: true,
      message: "Permission fetched successfully",
      data: isExistingPermission,
    });
  } catch (error) {
    console.log("Error in getPermissionByName");
    res.send({ status: false, message: error });
  }
};

const getAllPermissions = async (req, res) => {
  try {
    const permissionArray = await PermissionsCollection.findOne({});
    if (!permissionArray || permissionArray.length < 1) {
      return res
        .status(200)
        .send({ status: false, message: "No Permission Found" });
    }

    res.status(200).send({
      status: true,
      message: permissionArray.length + " Permission(s) found",
      data: permissionArray,
    });
  } catch (error) {
    console.log("Error in getAllPermissions");
    res.send({ status: false, message: error });
  }
};

const addNewPermissionToUser = async (req, res) => {
  try {
    const { user_id, permission_code } = req.query;
    const accountData = await AccountCollection.findOne({ user_id });
    if (!accountData) {
      return res
        .status(200)
        .send({ status: false, message: "No Account Found" });
    }
    const permissionData = await PermissionsCollection.findOne({
      code: permission_code,
    });
    if (!permissionData) {
      return res
        .status(200)
        .send({ status: false, message: "No Permission Found" });
    }

    const permissionArray = accountData.permissions;
    permissionArray.push(permissionData.code);
    const updatedAccount = await AccountCollection.findOneAndUpdate(
      { user_id },
      { permissions: permissionArray },
      { new: true }
    );

    res.status(200).send({
      status: true,
      message: "Permission added successfully",
      data: updatedAccount,
    });
  } catch (error) {
    console.log("Error in addNewPermissionToUser");
    res.send({ status: false, message: error });
  }
};

const removePermissionFromUser = async (req, res) => {
  try {
    const { user_id, permission_code } = req.query;
    const accountData = await AccountCollection.findOne({ user_id });
    if (!accountData) {
      return res
        .status(200)
        .send({ status: false, message: "No Account Found" });
    }
    const permissionData = await PermissionsCollection.findOne({
      code: permission_code,
    });
    if (!permissionData) {
      return res
        .status(200)
        .send({ status: false, message: "No Permission Found" });
    }

    const permissionArray = accountData.permissions;
    permissionArray = permissionArray.filter(
      (permission) => permission.code !== permission_code
    );
    const updatedAccount = await AccountCollection.findOneAndUpdate(
      { user_id },
      { permissions: permissionArray },
      { new: true }
    );

    res.status(200).send({
      status: true,
      message: "Permission removed successfully",
      data: updatedAccount,
    });
  } catch (error) {
    console.log("Error in removePermissionFromUser");
    res.send({ status: false, message: error });
  }
};

module.exports = {
  createNewPermission,
  getPermissionByName,
  getAllPermissions,
  addNewPermissionToUser,
  removePermissionFromUser,
};

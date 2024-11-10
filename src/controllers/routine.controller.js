const { Response } = require("../helpers");
class RoutineController {
  static createNewRoutine = async (req, res, next) => {
    try {
      new Response.Ok(res).setMessage("Create Routine").send();
    } catch (error) {
      console.log("Error - RoutineController - CreateNewRoutine");
      next(error);
    }
  };
  static getRoutine = async (req, res, next) => {
    try {
      new Response.Ok(res).setMessage("Get Routine").send();
    } catch (error) {
      console.log("Error - RoutineController - getRoutine");
      next(error);
    }
  };
  static updateRoutine = async (req, res, next) => {
    try {
      new Response.Ok(res).setMessage("Update Routine").send();
    } catch (error) {
      console.log("Error - RoutineController - updateRoutine");
      next(error);
    }
  };
  static deleteRoutine = async (req, res, next) => {
    try {
      new Response.Ok(res).setMessage("Delete Routine").send();
    } catch (error) {
      console.log("Error - RoutineController - deleteRoutine");
      next(error);
    }
  };

  static getAvailableData = async (req, res, next) => {
    try {
      // TODO: Get Available Faculties for each Period
      // TODO: Get Available Rooms for each Period
      new Response.Ok(res).setMessage("Getting Available Data").send();
    } catch (error) {
      console.log("Error - RoutineController - getAvailableData");
      next(error);
    }
  };
}

module.exports = RoutineController;

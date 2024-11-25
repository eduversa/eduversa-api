class RoutinePeriodService {
  static getAllPeriods = async () => {};

  static getAvailableData = async () => {
    try {
      const availableData = {
        monday: [{}, {}, {}, {}, {}, {}, {}, {}],
        tuesday: [{}, {}, {}, {}, {}, {}, {}, {}],
        wednesday: [{}, {}, {}, {}, {}, {}, {}, {}],
        thursday: [{}, {}, {}, {}, {}, {}, {}, {}],
        friday: [{}, {}, {}, {}, {}, {}, {}, {}],
      };
    } catch (error) {
      console.log("Error - Routine Service - getAvailableData");
      throw error;
    }
  };
}
module.exports = RoutineService;

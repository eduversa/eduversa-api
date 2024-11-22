const { DepartmentRepository } = require("../../repositories");

class DepartmentService {
  static createNewDepartment = async (data) => {
    try {
      const existingDepartment = await new DepartmentRepository().mustNotExist({
        course_id: data.course_id,
        name: data.name,
      });
      const department = new DepartmentRepository.Builder(data).build();
      await department.create();
      //   console.log(department);
      return department;
    } catch (error) {
      console.log("Error - Department Service - Create New Department");
      throw error;
    }
  };

  static updateDepartment = async (department_id, data) => {
    try {
      const existingDepartment = await new DepartmentRepository().mustExist({
        id: department_id,
      });
      const department = new DepartmentRepository.Builder(existingDepartment)
        .setData(data)
        .build();
      await department.update({ id: existingDepartment.id });
      return department;
    } catch (error) {
      console.log("Error - Department Service - Update Department");
      throw error;
    }
  };

  static getDepartmentById = async (department_id) => {
    try {
      const existingDepartment = await new DepartmentRepository().mustExist({
        id: department_id,
      });
      return existingDepartment;
    } catch (error) {
      console.log("Error - Department Service - getDepartmentById");
      throw error;
    }
  };

  static deleteDepartmentById = async (department_id) => {
    try {
      const existingDepartment = await new DepartmentRepository().mustExist({
        id: department_id,
      });

      await existingDepartment.delete();
      return existingDepartment;
    } catch (error) {
      console.log("Error - Department Service - deleteDepartmentById");
      throw error;
    }
  };

  static getAllDepartmentsByCourseId = async (course_id) => {
    try {
      const departments = await new DepartmentRepository().readMultiple({
        course_id,
      });
      return departments;
    } catch (error) {
      console.log("Error - Department Service - getAllDepartmentsByCourseId");
      throw error;
    }
  };

  static deleteAllDepartmentsByCourseId = async (course_id) => {
    try {
      const departments = await new DepartmentRepository().deleteMultiple({
        course_id,
      });
      return departments;
    } catch (error) {
      console.log(
        "Error - Department Service - deleteAllDepartmentsByCourseId"
      );
      throw error;
    }
  };
}

module.exports = DepartmentService;

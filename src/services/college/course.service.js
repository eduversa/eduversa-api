const { CourseRepository } = require("../../repositories");

class CourseService {
  static createNewCourse = async (data) => {
    try {
      const existingCourse = await new CourseRepository().mustNotExist({
        name: data.name,
        fees: data.fees,
        duration: data.duration,
      });

      const course = new CourseRepository.Builder(data).build();
      await course.create();
      return course;
    } catch (error) {
      console.log("Error - CourseService - createNewCourse");
      throw error;
    }
  };

  static updateCourse = async (course_id, data) => {
    try {
      const existingCourse = await new CourseRepository().mustExist({
        id: course_id,
      });

      const course = new CourseRepository.Builder(existingCourse)
        .setData(data)
        .build();
      await course.update({ id: existingCourse.id });
      return course;
    } catch (error) {
      console.log("Error - CourseService - updateCourse");
      throw error;
    }
  };

  static getCoursebyId = async (course_id, data) => {
    try {
      const existingCourse = await new CourseRepository().mustExist({
        id: course_id,
      });

      return existingCourse;
    } catch (error) {
      console.log("Error - CourseService - getCoursebyId");
      throw error;
    }
  };
  static deleteCoursebyId = async (course_id, data) => {
    try {
      const existingCourse = await new CourseRepository().mustExist({
        id: course_id,
      });
      await existingCourse.delete();
      return existingCourse;
    } catch (error) {
      console.log("Error - CourseService - deleteCoursebyId");
      throw error;
    }
  };

  static addDepartmentsToCourseById = async (course_id, departments) => {
    try {
      const existingCourse = await new CourseRepository().mustExist({
        id: course_id,
      });

      const course = new CourseRepository.Builder(existingCourse)
        .setDepartments([...existingCourse.departments, ...departments])
        .build();
      await course.update({ id: existingCourse.id });
      return course;
    } catch (error) {
      console.log("Error - CourseService - addDepartmentsToCourseById");
      throw error;
    }
  };

  static removeDepartmentsFromCourseById = async (course_id, departments) => {
    try {
      const existingCourse = await new CourseRepository().mustExist({
        id: course_id,
      });

      const courseBuilder = new CourseRepository.Builder(existingCourse);
      if (departments.length >= 1) {
        courseBuilder.setDepartments(
          existingCourse.departments.filter(
            (department) => !departments.includes(department)
          )
        );
      } else {
        courseBuilder.setDepartments([]);
      }
      const course = courseBuilder.build();
      await course.update({ id: existingCourse.id });
      return course;
    } catch (error) {
      console.log("Error - CourseService - removeDepartmentsFromCourseById");
      throw error;
    }
  };
}
module.exports = CourseService;

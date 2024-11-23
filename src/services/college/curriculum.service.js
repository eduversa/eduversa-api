const {
  CurriculumRepository,
  SubjectRepository,
  FacultyRepository,
} = require("../../repositories");

class CurriculumService {
  static createNewCurriculum = async (data) => {
    try {
      const existingCurriculum = await new CurriculumRepository().mustNotExist({
        passout_year: data.passout_year,
        semester: data.semester,
        department_id: data.department_id,
      });

      const curriculum = new CurriculumRepository.Builder(data).build();
      await curriculum.create();
      return curriculum;
    } catch (error) {
      console.log("Error - Curriculum Service - createNewCurriculum");
      throw error;
    }
  };
  static updateCurriculum = async (id, data) => {
    try {
      const existingCurriculum = await new CurriculumRepository().mustExist({
        id: id,
      });

      const curriculum = new CurriculumRepository.Builder(existingCurriculum)
        .setData(data)
        .build();
      await curriculum.update({ id: existingCurriculum.id });
      return curriculum;
    } catch (error) {
      console.log("Error - Curriculum Service - updateCurriculum");
      throw error;
    }
  };
  static getCurriculumById = async (id) => {
    try {
      const curriculum = await new CurriculumRepository().mustExist({
        id: id,
      });

      return curriculum;
    } catch (error) {
      console.log("Error - Curriculum Service - getCurriculumById");
      throw error;
    }
  };
  static deleteCurriculumById = async (id) => {
    try {
      const curriculum = await new CurriculumRepository().mustExist({
        id: id,
      });
      await curriculum.delete();
      return curriculum;
    } catch (error) {
      console.log("Error - Curriculum Service - deleteCurriculumById");
      throw error;
    }
  };
}

module.exports = CurriculumService;

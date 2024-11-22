const { SubjectRepository } = require("../../repositories");

class SubjectService {
  static createSubjectUsingData = async (data) => {
    try {
      const existingSubject = await new SubjectRepository().mustNotExist({
        id: data.id,
      });

      const subject = new SubjectRepository.Builder(data).build();
      await subject.create();
      return subject;
    } catch (error) {
      console.log("Error - SubjectService - createSubjectUsingData");
      throw error;
    }
  };
  static getOneSubjectUsingId = async (id) => {
    try {
      const subject = await new SubjectRepository().mustExist({
        id: id,
      });
      return subject;
    } catch (error) {
      console.log("Error - SubjectService - getOneSubjectUsingId");
      throw error;
    }
  };
  static deleteOneSubjectUsingId = async (id) => {
    try {
      const subject = await new SubjectRepository().mustExist({
        id: id,
      });
      await subject.delete();
      return subject;
    } catch (error) {
      console.log("Error - SubjectService - getOneSubjectUsingId");
      throw error;
    }
  };
  static updateSubjectUsingId = async (id, data) => {
    try {
      const existingSubject = await new SubjectRepository().mustExist({
        id: id,
      });

      const subject = new SubjectRepository.Builder(existingSubject)
        .setData(data)
        .setId(id)
        .build();
      await subject.update({ id });
      return subject;
    } catch (error) {
      console.log("Error - SubjectService - createSubjectUsingData");
      throw error;
    }
  };
}

module.exports = SubjectService;

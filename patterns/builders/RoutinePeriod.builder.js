const RoutinePeriodCollection = require("../../models/routineperiod.model");

class RoutinePeriod {
  id;
  day;
  subject;
  room;
  faculty;
  index;

  constructor() {
    this.faculty = [];
  }

  build(data) {
    this.setDay(data.day)
      .setID(data.id)
      .setFaculty(data.faculty)
      .setSubject(data.subject)
      .setRoom(data.room)
      .setIndex(data.index);
    return this;
  }

  async save(){
    try {
        const newPeriod = new RoutinePeriodCollection(this);
        await newPeriod.save();
        
    } catch (error) {
        console.log(error)
    }
  }

  setID(id) {
    this.id = id;
    return this;
  }
  setDay(day) {
    this.day = day;
    return this;
  }
  setSubject(subject) {
    this.subject = subject;
    return this;
  }
  setRoom(room) {
    this.room = room;
    return this;
  }
  setFaculty(faculties) {
    const temp_fac = faculties.split(/[ ]*,[ ]*/);
    temp_fac.forEach((fac) => {
      this.addFaculty(fac.toUpperCase());
    });
    return this;
  }
  addFaculty(faculty) {
    this.faculty.push(faculty);
    return this;
  }
  setIndex(index) {
    this.index = index;
    return this;
  }

  getID() {
    return this.id;
  }
  getDay() {
    return this.day;
  }
  getSubject() {
    return this.subject;
  }
  getRoom() {
    return this.room;
  }
  getFaculty() {
    return this.faculty;
  }
  getIndex() {
    return this.index;
  }
}

module.exports = RoutinePeriod;

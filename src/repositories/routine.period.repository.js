const { Generator } = require("../helpers");

class RoutinePeriodRepository {
  id = null;
  timeslot_id = null;
  room_id = null;
  faculty = null;
  subject_id = null;
  day = null;

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setData(builder);
    }
  }
  setData(data) {
    const { id, timeslot_id, room_id, faculty, subject_id, day } = data;
    if (id) {
      this.id = id;
    }
    if (timeslot_id) {
      this.timeslot_id = timeslot_id;
    }
    if (room_id) {
      this.room_id = room_id;
    }
    if (faculty) {
      this.faculty = faculty;
    }
    if (subject_id) {
      this.subject_id = subject_id;
    }
    if (day) {
      this.day = day;
    }
  }

  static Builder = class {
    id = null;
    timeslot_id = null;
    room_id = null;
    faculty = null;
    subject_id = null;
    day = null;

    constructor(data) {
      this.setDefaultData();
      if (data && typeof data == "object") {
        this.setData(data);
      }
    }

    setData(data) {
      const { id, timeslot_id, room_id, faculty, subject_id, day } = data;
      if (id) {
        this.setId(id);
      }
      if (timeslot_id) {
        this.setTimeSlotId(timeslot_id);
      }
      if (room_id) {
        this.setRoomId(room_id);
      }
      if (faculty) {
        this.setFaculty(faculty);
      }
      if (subject_id) {
        this.setSubjectId(subject_id);
      }
      if (day) {
        this.setDay(day);
      }
    }
    setDefaultData() {
      this.setId(Generator.getRoutinePeriodId()).setFaculty([]);
      return this;
    }

    setId(id) {
      this.id = id;
      return this;
    }
    setRoomId(id) {
      this.room_id = id;
      return this;
    }
    setSubjectId(id) {
      this.subject_id = id;
      return this;
    }
    setFaculty(faculty) {
      this.faculty = faculty;
      return this;
    }
    setTimeSlotId(id) {
      this.timeslot_id = id;
      return this;
    }
    setDay(day) {
      this.day = day;
      return this;
    }
  };
}

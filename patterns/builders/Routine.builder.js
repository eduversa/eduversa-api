const { ConsoleLogger } = require("prism-logger");
const RoutinePeriod = require("./RoutinePeriod.builder");

class Routine {
    year;
    stream;
    section;
    routine = {
        monday:[],
        tuesday:[],
        wednesday:[],
        thursday:[],
        friday:[]
    }

  setPeriod(periodData, index, day) {
    this[day].push(new RoutinePeriod().create({...periodData, index}));
    console.log(this[day])
  }
  setRoutine(routine){
    
  }
}

module.exports = Routine;

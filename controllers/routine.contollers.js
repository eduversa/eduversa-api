const RoutinePeriod = require("../patterns/builders/RoutinePeriod.builder");


const createNewRoutine = async (req, res)=>{
    try {
        const {year, section, stream, course,  routine} = req.body;
        const id = year+"/"+course.toUpperCase()+"/"+stream.toUpperCase()+"/"+section.toUpperCase();
        Object.keys(routine).forEach(day=>{
            routine[day].forEach(async (period, i)=>{
                const newPeriod = new RoutinePeriod().build({
                    id: id,
                    day: day.toLowerCase(),
                    room: period.room,
                    subject: period.subject,
                    faculty: period.faculty,
                    index: i
                })
                await newPeriod.save();
            })
        })
    } catch (error) {
        console.log("Error in functionName")
        res.send({status: false, message: error})
    }
}




module.exports = {createNewRoutine}
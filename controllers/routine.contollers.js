const RoutinePeriodCollection = require("../models/routineperiod.model");
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
        console.log("Error in createNewRoutine")
        res.send({status: false, message: error})
    }
}

const getRoutine = async (req, res)=>{
    try {
        const {year, section, stream, course} = req.query;
        const id = year+"/"+course.toUpperCase()+"/"+stream.toUpperCase()+"/"+section.toUpperCase();
        console.log(id)
        const monday = await RoutinePeriodCollection.find({id, day: "monday"});
        const routineData = {
            monday
        }
        res.status(200).send({status: true, message: "got a routine", data: routineData})
    } catch (error) {
        console.log("Error in getRoutine")
        res.send({status: false, message: error})
    }
}




module.exports = {createNewRoutine, getRoutine}
const College = require("../classes/college.class");
const CollegeCollection = require("../models/college.model");


const createNewCollege = async (req, res)=>{

    const {college_id} = req.body;

    const isExistingCollege = await CollegeCollection.findOne({college_id})
    if(isExistingCollege){
        return res.status(200).send({status: false, message: "College Already Exists"})
    }

    const newCollege = new College().setData(req.body);

    const addedCollege = await new CollegeCollection(newCollege).save()

    if(!addedCollege){
        return res.staus(400).send({status: false, message: "College Creation Failed"});
    }

    res.status(200).send({status: true, message: "College Creation Success"})
}


const getCollegeList = async (req, res)=>{

    // const newCollege = new College(req.body);

    const collegeList = await CollegeCollection.find({}).select({"college_name": 1, "college_id": 1, "_id": 0})

    if(!collegeList || collegeList.length<1){
        return res.staus(400).send({status: false, message: "No College Found"});
    }

    res.status(200).send({status: true, message: `${collegeList.length} Colleges Found`, data: collegeList})
}


const findCollegeByCollegeID = async (req, res)=>{

    const {college_id} = req.query;


    const collegeData = await CollegeCollection.findOne({college_id});

    if(!collegeData){
        return res.status(400).send({status: false, message: "College Not Found"});
    }

    res.status(200).send({status: true, message: `College Found`, data: collegeData})
}







module.exports = {createNewCollege, getCollegeList, findCollegeByCollegeID}
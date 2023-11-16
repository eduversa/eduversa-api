const Applicant = require("../classes/applicant.class");
const { ApplicantCollection } = require("../models/profile.models");


const updateApplicant = async (req, res)=>{
    try {
        const {user_id, type} = req.query;

        const isExistingApplicant = await ApplicantCollection.findOne({user_id});
        if(!isExistingApplicant){
            return res.status(200).send({status: false, message: "No applicant found"})
        }

        const applicantData = new Applicant(req.body, type)
        let updatedApplicant = false

        switch (type) {
            case "personal":
                updatedApplicant = await ApplicantCollection.findOneAndUpdate({user_id}, {personal_info: applicantData.personal_info}, {new: true})
                break;
        
            default:
                break;
        }

        // console.log(applicantData)

        res.status(200).send({status: true, message: "Applicant Updated Successfully", data: updatedApplicant})
        
    } catch (error) {
        console.log("Error in updateApplicant")
        res.send({status: false, message: error})
    }
}




module.exports = {updateApplicant}
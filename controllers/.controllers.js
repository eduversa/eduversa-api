

const functionName = async (req, res)=>{
    try {
        
    } catch (error) {
        console.log("Error in functionName")
        res.send({status: false, message: error})
    }
}




module.exports = {functionName}
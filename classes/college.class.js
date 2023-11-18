const collegeCollection = require("../models/college.model");

class College{
    setData(data){
        
        this.college_name = data.college_name;
        this.college_id = data.college_id
        

        this.college_address = {
            address: data.college_address.address,
            city: data.college_address.city,
            state: data.college_address.state,
            pincode: data.college_address.pincode

        }

        
        this.college_contact = []
        data.college_contact.forEach(contact=>{
            const newContact = {
                department: contact.department,
                phone: contact.phone? contact.phone.split(","):null,
                email: contact.email? contact.email.split(","):null
            }
            this.college_contact.push(newContact)
        })

        this.college_courses = []
        data.college_courses.forEach(course=>{
            let streams = []
            course.streams.forEach(stream=>{
                streams.push({
                    name: stream.name.toUpperCase(),
                    number_of_seats: parseInt(stream.number_of_seats)
                })
            })
            const newCourse = {
                code: course.code,
                name: course.name.toUpperCase(),
                fees: course.fees? parseInt(course.fees): null,
                streams: streams,
                duration: course.total_sem? course.total_sem/2: null,
                total_sem: course.total_sem? parseInt(course.total_sem): null,
                total_seats: course.total_seats? parseInt(course.total_seats): null
            }
            this.college_courses.push(newCourse)
        })

        return this;

    }


    async verify(college_id){
        const isVerified = await collegeCollection.findOne({college_id})
        return isVerified
    }
}


module.exports = College;
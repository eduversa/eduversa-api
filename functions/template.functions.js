const fs = require("fs")
const setCredentialsTemplate = ()=>{
    const html = fs.readFileSync(__dirname + "/../templates/accountCredentials.html", "utf-8")
      
        // console.log(typeof html)
        return html;
      
}
const setOTPTemplate = ()=>{
    const html = fs.readFileSync(__dirname + "/../templates/otp.html", "utf-8")
      
        // console.log(typeof html)
        return html;
      
}
const setUserIDTemplate = ()=>{
    const html = fs.readFileSync(__dirname + "/../templates/userid.html", "utf-8")
      
        // console.log(typeof html)
        return html;
      
}


// console.log(setCredentialsTemplate())

module.exports = {setCredentialsTemplate, setOTPTemplate, setUserIDTemplate}
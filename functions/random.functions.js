const randomNumberGenerator = (len)=>{
    const number = Math.floor(Math.random()*Math.pow(10, len));
    return number;
}
const randomStringGenerator = (len, special=false)=>{
    const alphas = "qwertyuiopasdfghjklzxcvbnm";
    const nums = "9876543210";
    const specials = "!@#$%^"

    let chars
    if(special){
        chars = alphas + nums + specials + alphas.toUpperCase()
    }else{
        chars = alphas + nums + alphas.toUpperCase()
    }

    chars = chars.split("")

    let res = ""

    for(let i=0; i<len; i++){
        res = res + chars[Math.floor(Math.random()*chars.length)]
    }
    return res;
}

const generateUserID = ()=>{
    return `${new Date().getFullYear()}00${randomNumberGenerator(4)}`
}

const genearatePassword = ()=>{
    return `${randomStringGenerator(10)}`
}

const createOTP = ()=>{
    return `${randomStringGenerator(8)}`
}

const generatePermissionCode = ()=>{
    return `${randomStringGenerator(20)}`
}


// const 


// console.log(randomStringGenerator(100, special = true))

module.exports = {randomNumberGenerator, generateUserID, genearatePassword, createOTP, generatePermissionCode}
const mongoose = require("mongoose");

const connection  = async()=>{
    return mongoose.connect (process.env.CONNECTION_URL).then(result =>{
        console.log("DB Connected successfully ...!");
    }).catch((error)=>{
        console.log("Fail To Connect DB ....!");
    })
}

module.exports = connection;
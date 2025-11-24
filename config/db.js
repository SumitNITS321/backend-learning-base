const mongoose = require('mongoose');
function connectDB(){
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("connctd to database")
    }).catch((err)=>{
        console.log("error in db connection",err)
    })
}
module.exports = connectDB
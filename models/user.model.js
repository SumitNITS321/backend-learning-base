// const { name } = require('ejs');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:[3,'name must be at least 3 characters']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        minlength:[10,'email sd b at least 10 chars']
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[5,'paasw sd be at least 10 chars']
    }
})
const user = mongoose.model('user',userSchema)
module.exports = user
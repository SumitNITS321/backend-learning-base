const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    path:{
        type:String,
        required:[true,'Path is required']
    },
    originalname:{
        type:String,
        required:[true,'Original name is required'] 
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,'User ID is required']
    }
})
const fileModel = mongoose.model('files',fileSchema)
module.exports = fileModel
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

///////////////// [ INTERN SCHEMA HERE ] /////////////////
const internSchema = new mongoose.Schema({
    name:{
        type:String,
        required:"The name of the intern is mandatory."
    },
    email:{
        type:String,
        unique:"The email should be unique.",
        required:"The email is required."       
    },
    mobile:{
        type:String,
        unique:"The mobile number should be unique.",
        required:"The mobile number is required." 
    }, 
    collegeId: {
        type: ObjectId,
        required: "The college id is required.",
        ref: ('College')
    },
    isDeleted:{
       type:Boolean,
       default:false
    }

},{timestamps:true})

///////////////// [ EXPRORTED AUTHOR MODEL ] /////////////////
module.exports = mongoose.model("Intern", internSchema)
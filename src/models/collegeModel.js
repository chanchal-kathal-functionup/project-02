const mongoose = require('mongoose');

///////////////// [ INTERN SCHEMA HERE ] /////////////////
const collegeSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:"Abbrivation of colllege should be unique",
        required:"The abrivvated name of the college is mandatory",
        trim:true
    },
    fullName:{
        type:String,
        required:"The full name of college is mandatory"
    },
    logoLink:{
        type:String,
        required:"The logoLink is mandatory"
    },
    isDeleted:{
       type:Boolean,
       default:false
    }

},{timestamps:true})

///////////////// [ EXPRORTED AUTHOR MODEL ] /////////////////
module.exports = mongoose.model("College", collegeSchema) 
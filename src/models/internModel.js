const mongoose=require("mongoose")
const ObjectId =mongoose.Schema.Types.ObjectId
const internSchema=new mongoose.Schema({

    name:{
        type:String,
        require:"the name of intern is required",
        unique:true
    },
    email:{type:String,
        required:"email is required",
        unique:true,
        lowercase:true
    },

    mobile:{type:String,
        required:"mobile no. is required",
        unique:true

    },
    collegeId:{
        type:ObjectId,
        ref:"College",
        require:"College Id is required"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
module.exports=mongoose.model("Intern", internSchema)
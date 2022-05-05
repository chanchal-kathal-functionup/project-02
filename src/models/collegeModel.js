const mongoose = require("mongoose");
const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "College name is required",
        unique:true,
        trim: true
    },//example: iith

    fullName:{type:String,
        required:"college fullName is required",
    },

      logolink:{
          type:String,
           required:"logolink is mandatory"
      },

      isDeleted:{
          type:Boolean,
          default:false
      }

    },{ timestamps: true })
module.exports = mongoose.model("College", collegeSchema)
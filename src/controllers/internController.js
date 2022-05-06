const mongoose = require('mongoose');
const validator = require("validator");
const internModel = require("../model/internModel")
const collegeModel=require("../model/collegeModel")

const createIntern = async function (req,res){
    try{
    const dataFromBody = req.body
    const  {name,email,mobile,collegeId}=dataFromBody
    if(!name)
    return res.status(400).send({status:false,message:"The name of intern is required"})

    if(!email)
    return res.status(400).send({status:false,message:"The email of intern is required"})

    const validEmail = validator.isEmail(email);
    if (validEmail === false)
      return res.status(400).send({ status: false, msg: "Please enter valid email" })

    const duplicateEmail = await internModel.findOne({email})
    if(duplicateEmail)
      return res.status(400).send({ status: false, msg: "Intern with this email already exists." })

    if(!mobile)
    return  res.status(400).send({ status: false, msg: "The mobile number is required." })

    const validateMobile = function (phoneString){

        reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return reg.test(phoneString);
    
    }
    if(!validateMobile(mobile))
    return res.status(400).send({status:false,message:"Please enter valid mobile number"})

    const duplicateMobile= await internModel.findOne({mobile})
    if(duplicateMobile)
    return res.status(400).send({ status: false, msg: "Intern with this mobile number already exists." })

    if(!collegeId)
    return res.status(400).send({status:false,message:"The collegeId of intern is required"})

    if (!mongoose.Types.ObjectId.isValid(collegeId)) 
        return res.status(400).send({ status: false, msg: "Please provide valid collegeId" });
      
     const checkCollege= await collegeModel.findById(collegeId)
        if(!checkCollege)
            return res.status(404).send({status:false,message:"No college exists with this collegeId"})
            const body=  {
              name:name,
              email:email,
              mobile:mobile,
              collegeId:clgId
              }
    
    const createIntern = await internModel.create(dataFromBody)
      return res.status(201).send({status:true,message:createIntern})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}
module.exports.createIntern= createIntern;
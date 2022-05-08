const mongoose = require('mongoose');
const validator = require("validator");
const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel");

const createIntern = async function (req,res){
    try{
    const dataFromBody = req.body
    const  {name,email,mobile,collegeName}=dataFromBody
    if(!name)
    return res.status(400).send({status:false,message:"The name of intern is required"})

    if(!email)
    return res.status(400).send({status:false,message:"The email of intern is required"})

    const validEmail = validator.isEmail(email);
    if (validEmail === false)
      return res.status(400).send({ status: false, msg: "Please enter valid email" })

    const duplicateEmail = await internModel.findOne({email:email,isDeleted:false})
    if(duplicateEmail)
      return res.status(409).send({ status: false, msg: "Intern with this email already exists." })

    if(!mobile)
    return  res.status(400).send({ status: false, msg: "The mobile number is required." })

    const validateMobile = function (phoneString){

        reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return reg.test(phoneString);
    
    }
    if(!validateMobile(mobile))
    return res.status(400).send({status:false,message:"Please enter valid mobile number"})

    const duplicateMobile= await internModel.findOne({mobile:mobile,isDeleted:false})
    if(duplicateMobile)
    return res.status(409).send({ status: false, msg: "Intern with this mobile number already exists." })

    if(!collegeName)
        return res.status(400).send({status:false,message:"The college name of intern is required"})

      
    const checkCollege= await collegeModel.findOne({name:collegeName,isDeleted:false})
    if(!checkCollege)
        return res.status(404).send({status:false,message:"No college exists with this college name"})

    const clgId = checkCollege._id

    const body=  {
        name:name,
        email:email,
        mobile:mobile,
        collegeId:clgId
        }

    const createIntern = await internModel.create(body)
        return res.status(201).send({status:true,data:createIntern})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}
module.exports.createIntern= createIntern;
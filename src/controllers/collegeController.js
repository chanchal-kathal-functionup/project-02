const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

//validation function
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
  //will return an array of all keys. so, we can simply get the length of an array with .length
};

//api to create a college

const createCollege = async function (req, res) {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      return res.status(400)
        .send({
          status: false,
          message: "Invalid request parameters. Please provide college details",
        });
    
    }
    if (!isValid(requestBody.name)) {
      return res
        .status(400)
        .send({ status: false, message: "College name is required" });
    }

    const duplicateCollege= await collegeModel.findOne({name:requestBody.name,isDeleted:false})
    if(duplicateCollege)
    return res.status(409).send({ status: false, msg: "This college name already exists." })

    if (!isValid(requestBody.fullName)) {
      return res
        .status(400)
        .send({ status: false, message: "College fullname is required" });
    }

    if (!isValid(requestBody.logoLink)) {
      res.status(400).send({ status: false, message: "Logolink is required" });
      return;
    }

    const validateURL = function (URL) {
      const regexp =
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      return regexp.test(URL);            // .test returns Boolean
    };
    if (!validateURL(requestBody.logoLink))
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid URL" });

    const createdCollege = await collegeModel.create(requestBody);
    return res.status(201).send({ status: true, data: createdCollege });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getCollegeDetails = async function (req, res) {
  try {
    if (!req.query.collegeName)
      return res.status(400).send({ status: false, message: "collegeName is required in query" });

    const collegeRequested = await collegeModel.findOne({ name: req.query.collegeName , isDeleted:false});

    if (!collegeRequested)
      return res
        .status(404)
        .send({ status: false, message: "no college with this name found" });

    const { _id, name, fullName, logoLink } = collegeRequested;  // destructuring the collegeRequested object

    const specificCollegeIntern = await internModel
      .find({ collegeId: _id , isDeleted:false })
      .select({collegeId: 0,isDeleted: 0,createdAt: 0, updatedAt: 0,__v: 0  });

    if (specificCollegeIntern.length === 0)
      return res.status(404).send({  status: false,  message: "no intern with this college name found" });

    const allInternsWithCollegeDetails = {
      name: name,
      fullName: fullName,
      logoLink: logoLink,
      interests: specificCollegeIntern,
    };

    return res.status(200).send({ status: true, data: allInternsWithCollegeDetails });
  } 
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createCollege = createCollege;
module.exports.getCollegeDetails = getCollegeDetails;
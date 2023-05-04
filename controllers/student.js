const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const axios = require("axios");
const roleToModel = require("./roles");
const Student = require("../models/student");
const Counter = require("../models/counter");
//sample data
//{"ID":"12345", "course":"PGDERP","coursePreference":["vcpde","dsa"],"lastName":"kuv","firstName":"abiu","middleName":"oil","Address":"iugwouh","permanentAddress":"ohoih","email":"a@gmail.com","gender":"iqbd","phyDis":"oubdo","number":"768768798","PHname":"hbdibqkudh","PHemail":"qydiy@khvdk.com","PHnumber":"927987298","dob":"24122002","domicileState":"maharashtra","nationality":"indian"}
exports.personalDetails = async(req, res) => {
    const {ID,
        course,
        coursepreferences,
        lastName,
        firstName,
        middleName,
        Address,
        permanentAddress,
        email,
        gender,
        phyDis,
        number,
        PHname,
        PHemail,
        PHnumber,
        dob,
        domicileState,
        nationality,
      } = req.body;
    
    
    //const user = await Student.findById(req.userId).exec();
    const user = await Student.findOne({email}).exec();
    try{
    console.log(user);
    user.personalInfo.ID = ID;
    user.personalInfo.course = course;
    user.personalInfo.coursepreferences = coursepreferences;
    user.personalInfo.lastName = lastName;
    user.personalInfo.firstName = firstName;
    user.personalInfo.middleName = middleName;
    user.personalInfo.Address = Address;
    user.personalInfo.permanentAddress = permanentAddress;
    user.personalInfo.email = email;
    user.personalInfo.gender = gender;
    user.personalInfo.phyDis = phyDis;
    user.personalInfo.number = number;
    user.personalInfo.PHname = PHname;
    user.personalInfo.PHemail = PHemail;
    user.personalInfo.PHnumber = PHnumber;
    user.personalInfo.dob = dob;
    user.personalInfo.domicileState = domicileState;
    user.personalInfo.nationality = nationality;
    await user.save().catch((err) => {
        console.log(err);
        return res.json({ error: "couldn't save record" });
      });
      return res.json({ success: "true" });
    } catch (error) {
      res.status(400).json({ error: "request body contains invalid data!!" })
      res.status(400).json(console.log(error))
    }

  };
//sample data:
//   {"otherCourses":["pgderp-2","2021","2022","98"],"examinationSSC":"SSC","instituteSSC":"DAV","datefromSSC":"2017","datetoSSC":"2019","percentageMarksSSC":"97","examinationHSC":"HSC","instituteHSC":"DAV","datefromHSC":"2019","datetoHSC":"2021","percentageMarksHSC":"99","examinationDiploma":"Diploma","instituteDiploma":"DAV2","datefromDiploma":"2019","datetoDiploma":"2022","percentageMarksDiploma":"98","examinationUG":"UG","instituteUG":"COEP","specializationUG":"CSE","datefromUG":"2021","datetoUG":"2025","marksFinalYearUG":"9","totalAggregateUG":"10","percentageMarksUG":"9","totalDeadBacklogsUG":"0","totalLiveBacklogsUG":"0","examinationPG":"PG","institutePG":"MIT","specializationPG":"CSE","datefromPG":"2025","datetoPG":"2026","marksFinalYearPG":"9","totalAggregatePG":"9","percentageMarksPG":"10","totalDeadBacklogsPG":"0","totalLiveBacklogsPG":"0"}
  exports.academicDetails = async(req, res) => {
    const {otherCourses,
    examinationSSC,
    instituteSSC,
    datefromSSC,
    datetoSSC,
    percentageMarksSSC,
    examinationHSC,
    instituteHSC,
    datefromHSC,
    datetoHSC,
    percentageMarksHSC,
    examinationDiploma,
    instituteDiploma,
    datefromDiploma,
    datetoDiploma,
    percentageMarksDiploma,
    examinationUG,
    instituteUG,
    specializationUG,
    datefromUG,
    datetoUG,
    marksFinalYearUG,
    totalAggregateUG,
    percentageMarksUG,
    totalDeadBacklogsUG,
    totalLiveBacklogsUG,
    examinationPG,
    institutePG,
    specializationPG,
    datefromPG,
    datetoPG,
    marksFinalYearPG,
    totalAggregatePG,
    percentageMarksPG,
    totalDeadBacklogsPG,
    totalLiveBacklogsPG,} = req.body;
    const email = "a@gmail.com"
    const user = await Student.findOne({email}).exec();
    try{
        user.academics.examinationSSC = examinationSSC;
        user.academics.instituteSSC = instituteSSC;
        user.academics.datefromSSC = datefromSSC;
        user.academics.datetoSSC = datetoSSC;
        user.academics.percentageMarksSSC = percentageMarksSSC;
        user.academics.examinationHSC = examinationHSC;
        user.academics.instituteHSC = instituteHSC;
        user.academics.datefromHSC = datefromHSC;
        user.academics.datetoHSC = datetoHSC;
        user.academics.percentageMarksHSC = percentageMarksHSC;
        user.academics.examinationDiploma = examinationDiploma;
        user.academics.instituteDiploma = instituteDiploma;
        user.academics.datefromDiploma = datefromDiploma;
        user.academics.datetoDiploma = datetoDiploma;
        user.academics.percentageMarksDiploma = percentageMarksDiploma;
        user.academicsUGPG.examinationUG = examinationUG;
        user.academicsUGPG.instituteUG = instituteUG;
        user.academicsUGPG.datefromUG = datefromUG;
        user.academicsUGPG.datetoUG = datetoUG;
        user.academicsUGPG.specializationUG = specializationUG;
        user.academicsUGPG.marksFinalYearUG = marksFinalYearUG;
        user.academicsUGPG.totalAggregateUG = totalAggregateUG;
        user.academicsUGPG.percentageMarksUG = percentageMarksUG;
        user.academicsUGPG.totalDeadBacklogsUG = totalDeadBacklogsUG;
        user.academicsUGPG.totalLiveBacklogsUG = totalLiveBacklogsUG;
        user.academicsUGPG.examinationPG = examinationPG;
        user.academicsUGPG.institutePG = institutePG;
        user.academicsUGPG.datefromPG = datefromPG;
        user.academicsUGPG.datetoPG = datetoPG;
        user.academicsUGPG.specializationPG = specializationPG;
        user.academicsUGPG.marksFinalYearPG = marksFinalYearPG;
        user.academicsUGPG.totalAggregatePG = totalAggregatePG;
        user.academicsUGPG.percentageMarksPG = percentageMarksPG;
        user.academicsUGPG.totalDeadBacklogsPG = totalDeadBacklogsPG;
        user.academicsUGPG.totalLiveBacklogsPG = totalLiveBacklogsPG;
        user.othercourses = otherCourses;
        await user.save().catch((err) => {
            console.log(err);
            return res.json({ error: "couldn't save record" });
          });
          return res.json({ success: "true" });
        } catch (error) {
          res.status(400).json({ error: "request body contains invalid data" })
        }

  };
//Sample Data:
//{"professionalDetails":["Google","2025","2027","CEO"]} 
  exports.professionalDetails = async(req, res) => {    
    
    //const user = await Student.findById(req.userId).exec();
    const email = "a@gmail.com";
    const user = await Student.findOne({email}).exec();
    try{
    user.professionalExperience = req.body.professionalDetails;
    await user.save().catch((err) => {
        console.log(err);
        return res.json({ error: "couldn't save record" });
      });
      return res.json({ success: "true" });
    } catch (error) {
      res.status(400).json({ error: "request body contains invalid data!!" })
      res.status(400).json(console.log(error))
    }

  };
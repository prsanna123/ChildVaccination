const express = require('express');
const User = require('../modals/Hospital');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Harryisagoodb$oy';
const Child=require('../modals/User');
//Route create hospital user
let hosp='';
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    console.log("in crea user")
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      hosp=req.body.name
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id
        }
      }
      success=true
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken)
  
      // res.json(user)
      res.json({ success,authtoken })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

router.get('/info',(req,res)=>{
    res.send('at backend auth')
})
//Route:Login
router.post('/login', [
    body('name', 'Enter a valid name'),
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    let success = false;
    hosp=req.body.name;
    console.log(req.body.name,req.body.password)
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    console.log("error",errors)
    if (!errors.isEmpty()) {
      console.log("errors in the route")
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, password } = req.body;
    console.log("name",name)
    try {
      let user = await User.findOne({name:name});
      console.log(user)
      if (!user) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        console.log("89")
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id
        }
      }
      console.log(success)
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      console.log(success)
      res.json({ success, authtoken })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  });
  router.post('/addchild',[
    body('hospitalname','Enter hospital name'),
    body('parentname','Enter parent name'),
    body('phonenumber','Enter 10 digit phone  number').isLength({equal:10}),
    body('dateofbirth','enter DOB')

  ],async(req,res)=>{
    const errors=validationResult(req);
    let success=false
    console.log(req.body.birthDate)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    let child=await Child.findOne({});
    try{
        child=await Child.create({
            name:req.body.hospitalname,
            parent_name:req.body.parentName,
            phone_num:req.body.phoneNumber,
            birth_date:req.body.birthDate
        });
        success=true
        res.json(success)
    }
catch(error){
console.log(error.message);
res.status(500).send("internal server error");}
  })

const twilio = require('twilio');
const nodemailer = require('nodemailer');
// Twilio API credentials
const accountSid = 'ACe977749d747f864eb377a9337232aac4';
const authToken = '9915f649a1b03c02c74fdd634379bf2e';
const twilioNumber = '+18146215868';
const client = twilio(accountSid, authToken);

router.get('/getchilddata',async (req,res)=>{
    try{
        console.log("hospital");
        console.log(hosp)
        // const child= await Child.find();
        const currentDate = new Date();
        const threeDaysAgo = new Date(currentDate);
        threeDaysAgo.setDate(currentDate.getDate() - 3);
        const data=await Child.find({
            birth_date: {
              $lt: currentDate,      // Match dates that are less than the current date
              $gte: threeDaysAgo  // Match dates greater than or equal to 3 days ago
            },
            name:hosp
          }
          ,{
            phone_num:1,_id:0,parent_name:1,name:1
        }
        );
        console.log(currentDate);
        console.log(threeDaysAgo)
        // const child=await Child.find();
        // console.log(data)
        let dat=data
        
        // dat.push({phone_num:"6304307125",parent_name:"ramesh",name:"aruna"})
        async function myfunc(){
            for(let i=0;i<dat.length;i++){
                console.log(dat[i].get('name'))
            const mobileNumber="+91"+dat[i].get('phone_num');
            const parent=dat[i].get('parent_name');
            const child=dat[i].get('name');
            const messageContent="Dear "+parent+" Your daughter "+child+" has vaccination scheduled on "+currentDate
            console.log(mobileNumber+messageContent)
            try {
                console.log(mobileNumber)

            const message = await  client.messages.create({
                body: messageContent,
                from: twilioNumber,
                to: mobileNumber,
                });
                // res.json({ success: true, messageSid: message.sid });
               
        }
        catch(error){
            console.error('Failed to send message:', error);
            // Return error response
            res.status(500).json({ success: false, error: error.message });
        }
    }
    res.json(dat);
        
        
        }
        console.log("calling async");
        myfunc();
        console.log("done with messaging");
        // res.send({info:child});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
module.exports=router
  
  module.exports=router
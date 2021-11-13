const express = require("express");
const router = express.Router();
const Contact = require("../src/models/User");
const authorization = require("../src/middleware/auth");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var flash = require('connect-flash');

router.get("/contact",(req,res)=>{
  req.flash('msg1','submitted your Query')
  req.flash('msg2',"Hey!");
  res.render("Contactus",{ans:req.flash('msg1'),mssg:req.flash('msg2')});
});
router.post("/contact",async(req,res)=>{
    // try {
        const { email,phone,name,message } = req.body;
        const contact=await new Contact({
          email:email,
          phone:phone,
          name:name,
          message:message
        }).save();
    //     res.redirect("/user/contact");
    //   } catch (error) {
    //     res.status(500).json({ error });
    //   }

    const output=`
    <p>you have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>email: ${req.body.email}</li>
    <li>phone: ${req.body.phone}</li>
    </ul>
    <h3>Message:</h3>
    <p>${req.body.message}</p>
    `;
    // using ethereal
    // let transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, 
    //   auth: {
    //     user: '', 
    //     pass: '', 
    //   },tls:{
    //   rejectUnauthorized:false
    // }
    // });

   // using gmail
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:false,
    auth: {
      user: process.env.email,
      pass: process.env.pass
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  const info = {
    from: 'pranjaldas3305@gmail.com', // sender address
    to: "pranjaldas503@gmail.com", // list of receivers
    subject: "Testing Purposes", // Subject line
    text: "all i want to know", // plain text body
    html: output // html body
  };

  transporter.sendMail(info,(error,info) => {
    if(error){
      return console.log(error);
    }
    else
      console.log("email sent successfully");
  });
  req.flash('msg1',"submitted successfully");
  req.flash('msg2',"Hurry!");
  res.render("Contactus",{ans:req.flash('msg1'),mssg:req.flash('msg2')});
});
// router.get("/con",(req,res)=>{
// res.send(req.flash('msg1'));
// });
module.exports =router; 
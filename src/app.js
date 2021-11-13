const express = require("express");
const mongoose =require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const bodyParser= require("body-parser");
const cookieParser=require("cookie-parser");
const authorization =require("./middleware/auth");
const flash = require("connect-flash");
const session = require("express-session");
const app =express();

const port = process.env.PORT || 7000;

const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));

require("dotenv").config();
 
app.set("view engine","ejs");
app.set("jwtTokenSecret",process.env.JWT_SECRET);

require("./db/conn");
const { Console } = require("console");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser("secret_passcode"));
app.use(
  session({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use((req, res, next) => {
  //set local variable and use it for many time
  res.locals.ans = req.flash();
  res.locals.mssg = req.flash();
  next();
});

var userRoutes = require("../routes/user");
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send('welcome to opening page ,it will show initially');
  });
  
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Schema.Types;
const contactSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
}, 
message:{
    type:String,
    required:true
},
phone:{
  type: Number,
  required:true
},
tokens: [
  {
    token: {
      type: String,
      required: true,
    },
  },
],
});

const contactinfo = new mongoose.model("contact", contactSchema);
module.exports = contactinfo;

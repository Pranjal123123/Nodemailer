# Nodemailer
Send e-mails with Node.JS - easy as cake!

## About
* A sample code to help integrate nodemailer into node, express 
* User can send information to client email through website

## How to Run?

* Git clone to Desktop
* npm install
* node src/app.js
## Example
This is a complete example to send an e-mail with plaintext and HTML body
```javascript
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "gmail.user@gmail.com",
        pass: "userpass"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Sender Name ✔ <sender@example.com>", // sender address
    to: "receiver1@example.com, receiver2@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});
```

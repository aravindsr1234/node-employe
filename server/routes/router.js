const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');
var Userdb = require('../model/model');
const multer = require('multer');   
const nodemailer = require('nodemailer');


const services = require('../services/render');

route.get('/index',services.homeRoutes);
route.get('/',services.update_user);
route.get('/details',services.details);
// API

// ===============================================================================
// IMAGE UPLOAD
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});
var upload = multer({
    storage: storage,
}).single('image');

// INSERT AN USER INTO DATABASE ROUTE
route.post('/api/users', upload, async (req, res) => {
        // validate req
        if(!req.body){
            res.status(400).send({message:"content can not be empty!"});
            return;
        }
    
        // new user
        const user = new Userdb({
            salutation:req.body.salutation,
            firstname:req.body.firstName,
            lastname:req.body.lastName,
            email:req.body.email,
            number:req.body.number,
            dob:req.body.dob,
            gender:req.body.gender,
            qualification:req.body.qualifications,
            address:req.body.address,
            country:req.body.countries,
            state:req.body.state,
            city:req.body.city,
            image: req.file.filename,
        })
        try {
            // Save to the database
            const data = await  user.save();
        
           
            var transporter = nodemailer.createTransport({
              host: "sandbox.smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "1e274c4e15e6bd",
                pass: "6449786b7d30ea"
              }
            });
        
            const mailOptions = {
              from: 'aravind@gmail.com', 
              to: req.body.email,
              subject: 'Welcome to Our Company!', 
              html: ` <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                  }
                  h1 {
                    color: #333;
                  }
                  p {
                    font-size: 16px;
                    line-height: 1.6;
                  }
                  .container {
                    text-align: center;
                    background-color: #f4f4f4;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  }
                  .logo {
                    max-width: 150px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <img src="/img/images.png" alt="Company Logo" class="logo">
                  <h1>Welcome to Our Company, ${req.body.firstName}!</h1>
                  <p>
                    Thank you for joining us. We are excited to have you as part of our team.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, justo ut convallis luctus,
                    risus mi viverra orci, a volutpat orci ante at metus.
                  </p>
                  <p>Best regards,</p>
                  <p>The Our Company Team</p>
                </div>
              </body>
            </html>`, 
            };
        
            const info = await transporter.sendMail(mailOptions);
            // console.log('Email sent: ', info.messageId);
        
            res.redirect('/dashboard');
          }
          catch (err) {
            res.status(500).send({
              message: err.message || "Some error occurred while creating a create operation",
            });
          }
    
        // save to database
        // user
        //   .save(user)
        //   .then(data => {
        //     // res.send(data)
        //     res.redirect('/dashboard')
        //   })

          
        //   .catch(err =>{
        //     res.status(500).send({
        //         message:err.message || "some error occurred while creating a create operation"
        //     });
        //   });
})
// ==.==================.=============================.========================.==

// route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete)
route.search('/search', controller.search)







module.exports =  route
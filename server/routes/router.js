const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');
var Userdb = require('../model/model');
const multer = require('multer');   

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
route.post('/api/users', upload, (req, res) => {
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
    
        // save to database
        user
          .save(user)
          .then(data => {
            // res.send(data)
            res.redirect('/dashboard')
          })
          .catch(err =>{
            res.status(500).send({
                message:err.message || "some error occurred while creating a create operation"
            });
          });
})
// ==.==================.=============================.========================.==

// route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete)







module.exports =  route
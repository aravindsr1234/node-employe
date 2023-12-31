var Userdb = require('../model/model');

// ======================================================================,,,================.===============.=====
// const multer = require('multer'); 
// // image upload
// var storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     cb(null, './uploads')
//   },
//   filename: function(req, file, cb){
//     cb(null, file.fieldname +"_"+Date.now()+"_"+file.originalname); 
//   },
// });

// var upload = multer({
//   storage: storage,
// }).single("image");


// =======================.=======================.=============================.===============.=============

// create and save
// exports.create =  (req,res) => {
//     // validate req
//     if(!req.body){
//         res.status(400).send({message:"content can not be empty!"});
//         return;
//     }

//     // new user
//     const user = new Userdb({
//         salutation:req.body.salutation,
//         firstname:req.body.firstName,
//         lastname:req.body.lastName,
//         email:req.body.email,
//         number:req.body.number,
//         dob:req.body.dob,
//         gender:req.body.gender,
//         qualification:req.body.qualifications,
//         address:req.body.address,
//         country:req.body.countries,
//         state:req.body.state,
//         city:req.body.city,
//         // image: req.file.filename
//     })

//     // save to database
//     user
//       .save(user)
//       .then(data => {
//         // res.send(data)
//         res.redirect('/dashboard')
//       })
//       .catch(err =>{
//         res.status(500).send({
//             message:err.message || "some error occurred while creating a create operation"
//         });
//       });
// }

// GET
exports.find = (req,res) => {
  // Pagination
  const { page, limit } = req.query;
  const skip = (page - 1) * (limit || 10);

    if(req.params.id){
        const id = req.query.id;

        Userdb.findById(id)
          .then(data => {
            if(!data){
                res.status(404).send({message:"not found user with id"+id})
            }else{
                res.send(data)
            }
          })
          .catch(err => {
            res.status(500).send({message:"error"})
          })
    }else{
        Userdb.find().skip(skip).limit(parseInt(limit) || 10)
    .then(user => {
        res.send(user)
        console.log(user);
    })
    .catch(err => {
        res.status(500).send({message:err.message || "error occurred while retriving user information"})
    })
    }

    
}

// UPDATE
exports.update = (req,res) => {
    if(!req.body){
        return res
           .status(400)
           .send({message:"data to update can not be empty"})
    }    
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
      .then(data => {
        if(!data){
            res.status(404).send({message:`cannot update user with ${id} maybe user not found`})
        }else{
            res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({message:"error update user information"})
      })
}

// DELETE
exports.delete = (req,res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
      .then(data => {
        if(!data) {
            res.status(404).send({message:`cannot update user with ${id} maybe user not found`})
        }else{
            res.send({
                message:"user was deleted successfully"
            })
        }
      })
      .catch(err =>{
        res.status(500).send({
            message:"could not delete user with id=" +id
        });
      });
}


// serch
exports.search = async (req, res) => {
  const searchTerm = req.query.term;

  try {
    const result = await Userdb.findOne({
      $or: [
        { firstName: searchTerm },
        { lastName: searchTerm },
        { email: searchTerm },
        { position: searchTerm },
      ],
    });

    if (result) {
      res.json(result);
    } else {
      res.json({ message: 'No employee found' });
    }
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
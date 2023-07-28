var Userdb = require('../model/model');

// create and save
exports.create = (req,res) => {
    // validate req
    if(!req.body){
        res.status(400).send({message:"content can not be empty!"});
        return;
    }

    // new user
    const user = new Userdb({
        salutation:req.body.salutation,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        number:req.body.number,
        dob:req.body.dob,
        gender:req.body.gender,
        qualification:req.body.qualification,
        address:req.body.address,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city
    })

    // save to database
    user
      .save(user)
      .then(data => {
        // res.send(data)
        res.redirect('/')
      })
      .catch(err =>{
        res.status(500).send({
            message:err.message || "some error occurred while creating a create operation"
        });
      });
}

// GET
exports.find = (req,res) => {

    if(req.query.id){
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
            res.status(500).send({message:error})
          })
    }else{
        Userdb.find()
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
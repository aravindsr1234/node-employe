
const axios = require('axios');
const express = require('express');
const app = express();

// exports.details = (req,res) => {
//   res.render('details')
// }



exports.homeRoutes = (req,res) =>{
    // Make a get request to /api/users
    axios.get('http://localhost:3001/api/users')
      .then(function(response){
        res.render('index',{users : response.data})
      })
      .catch(err => {
        res.send(err);
      })
} 


// exports.update_user = (req,res) => {
//   axios.get('http://localhost:3001/api/users',{params:{id:req.query.id}})
//     .then(function(userdata){
//       res.render("index",{user: userdata.data})
//       console.log(user)
//     })
//     .catch(err => {
//       res.send(err);
//     })
// }

exports.details = (req,res) => {
  axios.get('http://localhost:3001/api/users',{params:{id:req.query.id}})
    .then(function(id){
      res.render("details",{user: id.data});
    })
    .catch(err => {
      res.send(err);
    })
}



exports.update_user = (req,res) => {
  
}

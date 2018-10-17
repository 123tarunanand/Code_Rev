var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.register=function(req,res){
  var encryptedString = cryptr.encrypt(req.body.password);
  var now = new Date();
    var users=[[
      req.body.name,
      encryptedString,
      now]
    ]
    connection.query('SELECT * FROM user WHERE username = ?',[req.body.name], function (error, results, fields) {
      if (error) {
          return res.redirect('/register/?message=Database query error');
      }else{

        if(results.length >0){

            return res.redirect('/register/?message=Username already exists');


        }
        else {
          connection.query('INSERT INTO user (username,password,dojoin) VALUES?',[users], function (error, results, fields) {
            if (error) {
              return res.redirect('/register/?message=Database query error');
            }else{
              req.session.user = req.body.name
              return res.redirect('/profile/edit');
            }
          });
        }
    }});

}

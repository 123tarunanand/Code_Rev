var express=require("express");
var connection = require('./../config');

module.exports.edit=function(req,res){
  var user = req.session.user
  connection.query('SELECT * FROM user_profile where email_id = ? and username !=? and email_id not like ""',[req.body.email,req.session.user], function (error, results, fields){
    if (error)
    {
        return res.redirect('/profile/edit?message=Database query error 1')
    }
    else
    {
        if(results.length > 0)
        {
            return res.redirect('/profile/edit?message=Email id already in use')
        }
      else
        {
          connection.query('SELECT * FROM user_profile where username =?',[user],function(error,results,fields){
          if (error){
            return res.redirect('/profile/edit?message=Database query error 2')
          }
          else {
            if(results.length == 0)
            {
              var profile = [[req.session.user , req.body.fname , req.body.lname , req.body.email , req.body.desc]]
              connection.query('INSERT INTO user_profile(username,fname,lname,email_id,description) VALUES ?',[profile],function(error,results,fields){
                if (error){
                  return res.redirect('/profile/edit?message=Database query error 3')
                }
                else {
                  return res.redirect('/profile')
                }
              }
            );
            }
            else {
              connection.query('UPDATE user_profile SET fname = ?, lname = ?, email_id = ?,description = ? WHERE username = ?',[req.body.fname,req.body.lname,req.body.email,req.body.desc,req.session.user],
              function(error,results,fields){
                if (error){
                  return res.redirect('/profile/edit?message=Database query error 4')
                }
                else {
                  return res.redirect('/profile')
                }
              }

              );

            }
          }
        });
        }
    }
  });
}

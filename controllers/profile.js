var express=require("express");
var connection = require('./../config');

module.exports.profileload=function(req,res){
  if(!req.session.user)
  {
    return res.redirect('/')
  }
  connection.query('SELECT cname from subscribed WHERE username = ?',[req.session.user],function(error,results,fields){
    if(error)
    {
      res.render(__dirname+"/./../templates/"+"profile.html",{username:req.session.user,fname:'-',lname:'-',email:'-',date:'-',rep:'-',posts:'-',comms:'-',desc:'-'});
    }
    else {
      var re = []
      for(obj in results)
      {
        re.push(results[obj].cname)
      }
      connection.query('SELECT * from user_profile,user WHERE user_profile.username =? and user.username =?',[req.session.user,req.session.user],function(error,results,fields){
        if(error)
        {
          res.render(__dirname+"/./../templates/"+"profile.html",{username:req.session.user,fname:'-',lname:'-',email:'-',date:'-',rep:'-',posts:'-',comms:'-',desc:'-',subscribed:'-'});
        }
        else {
          if(results[0])
            {
              res.render(__dirname+"/./../templates/"+"profile.html",{username:req.session.user,fname:results[0].fname,lname:results[0].lname,email:results[0].email_id,date:results[0].dojoin,rep:results[0].reputation,posts:results[0].posts,comms:results[0].comments,desc:results[0].description,subscribed:re});

          }
          else {
            res.render(__dirname+"/./../templates/"+"profile.html",{username:req.session.user,fname:'-',lname:'-',email:'-',date:'-',rep:'-',posts:'-',comms:'-',desc:'-',subscribed:re});
          }
        }
      });
    }

  });


}

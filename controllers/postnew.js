var express=require("express");
var connection = require('./../config');

module.exports.newpost=function(req,res){
  if(!req.session.user)
  {
    return res.redirect('/')
  }
  connection.query('SELECT * from post WHERE title = ?',[req.body.title],function(error,results,fields){
    if(error)
    {
      return res.redirect('/posts/new/?message=Database query error 1');
    }
    else {
      if(results.length >0)
      {
        return res.redirect('/posts/new/?message=Title already exists');
      }
      else {
        var dateTime = require('node-datetime');
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d H:M:S');

        connection.query('select postid from post order by postid desc limit 1',function(error,results,fields){
          if(error)
          {
            return res.redirect('/posts/new/?message=Database query error 2');
          }
          else {
            console.log(results)
            if(results.length > 0)
            {
              var postdata = [
                [req.body.title,
                req.body.cont,
                formatted,
                results[0].postid + 1,
                req.session.user]
              ]
            }
            else {
              var postdata = [
                [req.body.title,
                req.body.cont,
                formatted,
                1,
                req.session.user]
              ]
            }
            connection.query('INSERT INTO post (title,content,time,postid,username) VALUES?',[postdata],function(error,results,fields){
              if(error)
              {
                return res.redirect('/posts/new/?message=Database query error 3')
              }
              else {
                connection.query('UPDATE user_profile SET posts = posts + 1 where username =?',[req.session.user]);
                return res.redirect('/home')
              }
            }
          );
          }
        }
      );

      }
    }
  }

);

}

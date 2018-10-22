var express=require("express");
var connection = require('./../config');

module.exports.newcomment=function(req,res) {
  if(!req.session.user)
  {
    return res.redirect('/')
  }
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var formatted_dt = dt.format('Y-m-d H:M:S');
  var username = req.session.user;
  var postid = req.body.postid;
  var commentid = 1;
  connection.query('SELECT commentid FROM comment ORDER BY commentid DESC LIMIT 1',function(error,results,fields) 
  {
    if(error)
    {
      console.log('Database query error while getting comment id');
    }
    else{
      if(results.length > 0)
      {
        commentid = results[0].commentid + 1
      }
      var commentdata = [
        [
          commentid,
          req.body.cont,
          formatted_dt,
          username,
          postid
        ]
      ];
      connection.query('INSERT INTO comment (commentid,content,time,username,postid) VALUES?',[commentdata],function(error,results,fields){
        if(error)
        {
          console.log('Database query error while inserting comment');
        }
        else {
          connection.query('UPDATE user_profile SET comments = comments + 1 where username =?',[username], function(error) 
          {
            if(error)
            {
              console.log('Database query error while updading comment count');
            }
            else
            {
              connection.query('UPDATE post SET comments = comments + 1 where postid =?',[postid], function(error) 
              {
                if(error)
                {
                  console.log('Database query error while getting comment id');;
                }
              });
              return res.redirect('/posts/p/' + postid);
            }
          });
        }
      });
    }
  });
}
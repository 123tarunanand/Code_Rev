var express=require("express");
var connection = require('./../config');

module.exports.newvote=function(req,res) {
  if(!req.session.user)
  {
    return res.redirect('/')
  }
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var formatted_dt = dt.format('Y-m-d H:M:S');
  var username = req.session.user;
  var postid = req.body.postid;
  console.log('Data: ' + JSON.stringify(req.body));
  var votedata = [
    [
      username,
      postid,
      formatted_dt
    ]
  ];
  connection.query('INSERT INTO postvotes(username, postid, time) VALUES?',[votedata],function(error) 
  {
    if(error)
    {
      console.log('Database query error while voting');
      res.json({ 'vote': 'ERROR' });
    }
    else
    {
      console.log('New vote created');
      connection.query('UPDATE post SET votes=votes+1 WHERE postid=?',[postid],function(error)
      {
        if(error)
        {
          console.log('Database query error while updating vote count');
          res.json({ 'vote': 'ERROR' });
        }
        else
        {
          console.log('Vote count updated')
          //update reputation for the user
          connection.query('UPDATE user_profile SET reputation=reputation+1 WHERE username=(SELECT username FROM post WHERE postid=?)',[postid],function(error)
          {
            if(error)
            {
              console.log('Database query error while updating reputation');
              res.json({ 'vote': 'ERROR' });
            }
            connection.query("SELECT votes FROM post WHERE postid=?",[postid], function(error,results)
            {
              if(error)
              {
                console.log('Database query error while updating vote count');
                res.json({ 'vote': 'ERROR' });
              }
              else
                res.json({ 'vote': 'increment' , 'count' : results[0].votes});
            });
          });
        }
      });
    }
  });
}
var express=require("express");
var connection = require('./../config');

module.exports.newsubscribe=function(req,res) {
  if(!req.session.user)
  {
    return res.redirect('/')
  }
  var username = req.session.user;
  var cname = req.body.category;
  console.log('Data: ' + JSON.stringify(req.body));
  var subdata = [
    [
      username,
      cname
    ]
  ];
  connection.query('INSERT INTO subscribed(username, cname) VALUES?',[subdata],function(error) 
  {
    if(error)
    {
      console.log('Database query error while subscribing');
      res.json({ 'subscribe': 'ERROR' });
    }
    else
    {
      console.log('Subscribed');
      res.json({ 'subscribe': 'done'})
    }
  });
}
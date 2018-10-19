var express=require("express");
var connection = require('./../config');

module.exports.postcreate = function(req,res){
  var res1,res2;
  connection.query('SELECT * from post WHERE postid =?',[req.params.postid],function(error,results,fields){
    if(error)
    {
      console.log(error)
    }
    else {
      if(results.length ==0)
      {
        return res.render(__dirname+"./../templates/error.html");
      }
      var data = {'title':results[0].title,
    'content':results[0].content,
  'username':results[0].username,
'votes':results[0].votes,
'time':results[0].time,
'comments':results[0].comments}
  connection.query('SELECT * from belongstocategory WHERE postid =?',[req.params.postid],function(error,results,fields){
    if(error)
    {
      console.log(error)
    }
    else {
      var cats =[]
      for(obj in results)
      {
        cats.push(results[obj].cname)
      }
        res.render(__dirname+"/./../templates/"+"postsite.html",{data:data,cats:cats});
    }
  });

    }
  })


}


module.exports.userpage = function(req,res){
  connection.query('SELECT title,postid from post where username =?',[req.params.user],function(error,results,fields){
    if(error)
    {
      console.log(error)
    }
    else {
      if(results.length ==0)
      {
        res.render(__dirname+"./../templates/error.html");
      }
      else {
        var data = []
        for (obj in results)
        {
           data.push({'title':results[obj].title,'id':results[obj].postid})
        }
        res.render(__dirname+'./../templates/allposts.html',{username:req.params.user,data:data})
      }
    }
  });
}

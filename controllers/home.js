var express=require("express");
var connection = require('./../config');

module.exports.feed= function(req,res){
  if(!req.session.user)
  {
    return res.redirect('/')
  }

  connection.query('SELECT post.time,post.postid,post.title,post.username,subscribed.cname FROM post,subscribed,belongstocategory WHERE post.postid = belongstocategory.postid AND belongstocategory.cname = subscribed.cname AND subscribed.username =?',[req.session.user],function(error,results,fields){
    if(error)
    {
      console.log(error)
    }
    else {
      console.log(results);
      var postdata=[]
      for obj in results{
        postdata.push({'title':results[obj].title,'postid':results[obj].postid,''})
      }
    }
  });
  res.render(__dirname+"./../templates/"+"home.html",{username:req.session.user});
}

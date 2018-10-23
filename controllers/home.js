var express=require("express");
var connection = require('./../config');

module.exports.feed= function(req,res){
  if(!req.session.user)
  {
    return res.redirect('/')
  }

  connection.query('SELECT post.time, post.postid,post.title,post.username FROM post,subscribed,belongstocategory WHERE post.postid = belongstocategory.postid AND belongstocategory.cname = subscribed.cname AND subscribed.username =?',[req.session.user],function(error,results,fields){
    if(error)
    {
      console.log(error)
    }
    else {
      var postdata=[]
     for (obj in results){
        postdata.push({'title':results[obj].title ,'postid':results[obj].postid,'username':results[obj].username,'time':results[obj].time})
      }
      res.render(__dirname+"./../templates/"+"home.html",{username:req.session.user,posts:postdata});
    }
  });

}

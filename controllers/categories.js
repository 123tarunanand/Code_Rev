var express=require("express");
var connection = require('./../config');

module.exports.homepage = function(req,res)
{
  connection.query('SELECT * from categories where name =?',[req.params.cname],function(error,results,fields){
    if(error)
    {
      console.log(error)
    }
    else {
      if(results.length==0)
      {
        return res.render(__dirname+"./../templates/error.html");
      }
      else {
        connection.query('SELECT post.postid,title from belongstocategory,post WHERE belongstocategory.postid = post.postid AND cname = ?',[req.params.cname],function(error,results,fields)
        {
          if(error)
          {
            console.log(error)
          }
          else {
            var data = []
            for (obj in results)
            {
               data.push({'title':results[obj].title,'id':results[obj].postid})
            }
            return res.render(__dirname+"./../templates/categories.html",{cname:req.params.cname,data:data});
          }
        });
      }
    }
  });
}

module.exports.search = function(req,res)
{
  connection.query('SELECT name from categories WHERE name LIKE ?','%'+[req.query['search']]+'%',function(error,results,fields){
    var data = []
    for(obj in results)
    {
      data.push({'category':results[obj].name})
    }
    return res.render(__dirname+"./../templates/search.html",{search:req.query['search'],data:data});
  });

}

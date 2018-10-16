var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./../config');
module.exports.authenticate=function(req,res){

    var user=req.body.username;
    var password=req.body.password;


    connection.query('SELECT * FROM user WHERE username = ?',[user], function (error, results, fields) {
      if (error) {
          return res.redirect('/?message=Database query error');
      }else{

        if(results.length >0){
  decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
              req.session.user = user
              return res.redirect('/home');
            }else{
              return res.redirect('/?message=Incorrect Password');
            }

        }
        else{
          return res.redirect('/?message=Username does not exist');
        }
      }
    });
}

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.100.12.43',
  user     : '16co153',  /*  Enter username here*/
  password : '16189742', /*Enter password here */
  database : 'CODEREV',
  multipleStatements : 'true'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;
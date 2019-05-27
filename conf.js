const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', 
user :  'root', 
password :  'martialpassword', 
database :  'filRouge',
});
module.exports = connection;
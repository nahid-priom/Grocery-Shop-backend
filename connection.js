const mysql = require("mysql");
var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "grocery-products-CRUD",
});

connection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else console.log(err); 
});

module.exports = connection;
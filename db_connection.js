// make msql connection

let mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "askl7410",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected! to Mysql");
});

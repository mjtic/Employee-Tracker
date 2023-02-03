//mysql2
const mysql= require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection(
    process.env.DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    },
    console.log(`connected to employee_tracker_db`)
  );

  connection.connect(function(err){
    if (err) throw err;
  });

  module.experts = connection;
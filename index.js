//Dependencies
//inquirer
// const inquirer = require("inquirer");
// const connection = require('./db/connection');
// // mysql2
// const mysql= require("mysql2");
// //console.table
// require("console.table");

// require('dotenv').config();
// create the connection to database
// const connection = mysql.createConnection(
//   process.env.DATABASE,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   },
//   console.log(`Connected to the books_db database.`)
// );

const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
require('dotenv').config();

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    }, 
    console.log('Connected to the employee_tracker_db.')
);


function startMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "View all departments.",
          "View all roles.",
          "View all employees.",
          "Add a departmnet.",
          "Add a role.",
          "Add an employee.",
          "Update Employee role",
          "Exit"
        ],
      },
    ])
    .then(function (answers) {
      switch (answers.userChoice) {
        case "View all departments.":
          viewAllDepts();
          break;
        case "View all roles.":
          viewAllRoles();
          break;
        case "View all employees.":
          viewAllEmps();
          break;
        case "Add a department.":
          AddDept();
          break;
        case "Add a role.":
          AddRole();
          break;
        case "Add an employee.":
          AddEmp();
          break;          
        case "Update employee role.":
          UpdateEmp();
          break;
        case "Exit.":
          connection.end();
          break;          
      }
    });
}

//View all department function
function viewAllDepts (){
  connection.promise().query('SELECT id AS Dept_ID, name AS Dept_NAME FROM department;', function(err,results){
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
//formatted table showing dept. names and dept. ids
}
//View all role function
function viewAllRoles(){
//job title, role id, dept., salary
}
//View all employee funciton
function viewAllEmps (){
//formatted table showing employee data (ids, first_name, last_name, job_titles, dept, salary, manager(supervisor))
}





startMenu();

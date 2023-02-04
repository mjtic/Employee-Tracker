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

const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
require("dotenv").config();

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  },
  console.log("Connected to the employee_tracker_db.")
);

connection.connect(function (err) {
  if (err) throw err;
});

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
          "Exit",
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
function viewAllDepts() {
  connection.query(
    "SELECT name AS Dept_NAME, id AS Dept_ID FROM department",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      return startMenu();
    }
  );
  //formatted table showing dept. names and dept. ids
}
//View all role function
function viewAllRoles() {
  connection.query(
    "SELECT roles.id AS Role_ID, roles.title AS Job_Title, department.name AS Department, roles.salary AS Salaries FROM roles JOIN department ON roles.department_id = department.id",
    function (err, results){
      if (err) {
        console.log (err);
      }
      console.table(results);
      return startMenu();
    }
  )
  //job title, role id, dept., salary
}
//View all employee funciton
function viewAllEmps() {
  connection.query(
    "SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, roles.title AS Title, department.name AS Department, roles.salary AS Salaries, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department department ON department.id = roles.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id;",
  function (err, results){
    if(err) {
      console.log(err);
    }
    console.table(results);
    return startMenu();
   }
  )
  //formatted table showing employee data (ids, first_name, last_name, job_titles, dept, salary, manager(supervisor))
}

startMenu();

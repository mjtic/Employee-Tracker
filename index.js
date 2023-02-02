//Dependencies
//inquirer
const inquirer = require("inquirer");
//mysql2
const mysql= require("mysql2");
//console.table
require("console.table");

// create the connection to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'Wldkcl0522',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the books_db database.`)
);


function startMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "Please choose your menu:",
        choices: [
          "View all departments.",
          "View all roles.",
          "View all employees.",
          "Add a departmnet.",
          "Add a role.",
          "Add an employee.",
          "Update Employee role"
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
        default:
          break;
      }
    });
}

//View all department function
function viewAllDepts (){
  connection.query('SELECT * FROM department;', function(err,results){
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

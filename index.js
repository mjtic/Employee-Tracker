//inquirer
const inquirer = require("inquirer");
//console.table
require("console.table");

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
//formatted table showing dept. names and dept. ids
    return startMenu();
}
//View all role function
function viewAllRoles(){
//job title, role id, dept., salary
    return startMenu();
}
//View all employee funciton
function viewAllEmps (){
//formatted table showing employee data (ids, first_name, last_name, job_titles, dept, salary, manager(supervisor))
    return startMenu();
}





startMenu();

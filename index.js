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
const utils = require("util");
connection.query = utils.promisify(connection.query);

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
          "Add a department.",
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
          addDept();
          break;
        case "Add a role.":
          addRole();
          break;
        case "Add an employee.":
          addEmp();
          break;
        case "Update employee role.":
          updateEmp();
          break;
        
        default: connection.end();
          break;
      }
    });
}

//View all department function
async function viewAllDepts() {
  const allDepts = await connection.query(
    "SELECT name AS Dept_NAME, id AS Dept_ID FROM department"
  );
  console.table(allDepts);
  return startMenu();
}

//formatted table showing dept. names and dept. ids

//View all role function
async function viewAllRoles() {
  const allRoles = await connection.query(
    "SELECT roles.id AS Role_ID, roles.title AS Job_Title, department.name AS Department, roles.salary AS Salaries FROM roles JOIN department ON roles.department_id = department.id"
  );
  console.table(allRoles);
  return startMenu();
}
//job title, role id, dept., salary
//View all employee funciton
async function viewAllEmps() {
  const allEmployee = await connection.query(
    "SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, roles.title AS Title, department.name AS Department, roles.salary AS Salaries, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department department ON department.id = roles.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
  );
  console.table(allEmployee);
  return startMenu();
}

async function addDept() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the name of the new department?",
    },
  ]);
  const newDept = await connection.query(
    `INSERT INTO department (name) VALUES ("${answer.newDepartment}")`
  );
  console.log(
    `Successfully added the ${answer.newDepartment} into departments`
  );
  startMenu();
}
//prompted to enter the name, salary, and department for the role and that role is added to the database

addRole = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'roles',
      message: "What roles do you want to add?",
      validate: addRole => {
        if (addRole) {
            return true;
        } else {
            console.log('Please enter a role');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?",
      validate: addSalary => {
        if (addSalary) {
            return true;
        } else {
            console.log('Please enter a salary');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.roles, answer.salary];

      // grab dept from department table
      const roleSql = `SELECT * FROM department`; 

      connection.query(roleSql, (err, data) => {
        if (err) throw err; 
    
        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "What department is this role in?",
          choices: dept
        }
        ])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO roles (title, salary, department_id)
                        VALUES (?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('Added' + answer.roles + " to roles!"); 

              startMenu();
       });
     });
   });
 });
};


//formatted table showing employee data (ids, first_name, last_name, job_titles, dept, salary, manager(supervisor))

// async function addDept() {
//   const userInput = await inquirer.prompt([
//     {
//      type: 'input',
//      name: 'addDept',
//      message: 'Please enter the department you want to add'
//     }
//   ])
//   // const sql = `INSERT INTO department (name) VALUES (?)`;
//   // const params = userInput.addDept;
//   const newDept = await connection.query(`INSERT INTO department (name) VALUES "${userInput.addDept}"` );

//   console.table(newDept);
//         return startMenu();
//       }
// }
// }

startMenu();

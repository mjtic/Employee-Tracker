//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
require("dotenv").config();
//creating connection to localhost
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
//start menu function prompt using switch case
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
          "Update Employee role.",
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
        case "Update Employee role.":
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
// employee’s first name, last name, role, and manager, and that employee is added to the database
// function to add an employee 
addEmp = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "What is the employee's first name?",
      validate: addFirst => {
        if (addFirst) {
            return true;
        } else {
            console.log('Please enter a first name');
            return false;
        }
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is the employee's last name?",
      validate: addLast => {
        if (addLast) {
            return true;
        } else {
            console.log('Please enter a last name');
            return false;
        }
      }
    }
  ])
    .then(answer => {
    const params = [answer.first_name, answer.last_name]

    // grab roles from roles table
    const roleSql = `SELECT roles.id, roles.title FROM roles`;
  
    connection.query(roleSql, (err, data) => {
      if (err) throw err; 
      
      const roles = data.map(({ id, title }) => ({ name: title, value: id }));

      inquirer.prompt([
            {
              type: 'list',
              name: 'roles',
              message: "What is the employee's role?",
              choices: roles
            }

          ])
            .then(roleChoice => {
              const role = roleChoice.roles;
              params.push(role);

              const managerSql = `SELECT * FROM employee`;

              connection.query(managerSql, (err, data) => {
                if (err) throw err;

                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

                // console.log(managers);

                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managers
                  }
                ])
                  .then(managerChoice => {
                    const manager = managerChoice.manager;
                    params.push(manager);

                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

                    connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added!")

                    startMenu();
              });
            });
          });
        });
     });
  });
};
// function to update an employee 
updateEmp = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err; 

  const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = []; 
        params.push(employee);

        const roleSql = `SELECT * FROM roles`;

        connection.query(roleSql, (err, data) => {
          if (err) throw err; 

          const roles = data.map(({ id, title }) => ({ name: title, value: id }));
          
            inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's new role?",
                choices: roles
              }
            ])
                .then(roleChoice => {
                const role = roleChoice.roles;
                params.push(role); 
                
                let employee = params[0]
                params[0] = role
                params[1] = employee 
                

                // console.log(params)

                const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                connection.query(sql, params, (err, result) => {
                  if (err) throw err;
                console.log("Employee has been updated!");
              
                startMenu();
          });
        });
      });
    });
  });
};




startMenu();

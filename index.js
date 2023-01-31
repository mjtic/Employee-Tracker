const inquirer = require("inquirer");
require("console.table");

function startMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "Please Choose an Action:",
        choices: [
          "Get all employees.",
          "Get all roles.",
          "Get all departments.",
        ],
      },
    ])
    .then(function (answers) {
      switch (answers.userChoice) {
        case "Get all employees.":
          getAllEmps();
          break;
        case "Get all employees.":
          getAllEmps();
          break;
        default:
          break;
      }
    });
}

startMenu();

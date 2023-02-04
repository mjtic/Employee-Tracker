SELECT *
FROM department;

SELECT *
FROM roles;

SELECT *
FROM employee;


SELECT name AS Dept_NAME, id AS Dept_ID FROM department;

SELECT roles.title AS Job_Title, roles.id AS Role_ID, department.name AS Department, roles.salary AS Salaries FROM roles JOIN department ON roles.department_id = department.id;

SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, roles.title AS Title, department.name AS Department, roles.salary AS Salaries, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department department ON department.id = roles.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id;

enter the name of the department and that department is added to the database

INSERT INTO department (name) VALUES ("Operation")
    
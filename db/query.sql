SELECT *
FROM department;

SELECT *
FROM roles;

SELECT *
FROM employee;


SELECT name AS Dept_NAME, id AS Dept_ID FROM department;

SELECT roles.title AS Job_Title, roles.id AS Role_ID, department.name AS Department, roles.salary AS Salaries FROM roles JOIN department ON roles.department_id = department.id;

job title, role id, the department that role belongs to, and the salary for that role

SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department;
 

                                            employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to




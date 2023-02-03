SELECT *
FROM department;

SELECT *
FROM roles;

SELECT *
FROM employee;


SELECT name AS Dept_NAME, id AS Dept_ID FROM department;

SELECT roles.id AS id, roles.title AS title, department.name AS department, roles.salary AS salary FROM roles JOIN department ON roles.department_id = department.id



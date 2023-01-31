-- Write your schema here --

DROP DATABASE IF EXISTS orgchart_db;
CREATE DATABASE orgchart_db;

USE orgchart_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (65, 30) NOT NULL AUTO_INCREMENT,
  department_id INT NOT NULL AUTO_INCREMENT --foreign key
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL AUTO_INCREMENT, --foreign key
  manager_id INT NOT NULL AUTO_INCREMENT
);
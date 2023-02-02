-- Write your schema here --

DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

-- Dept. Table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL, -- to hold dept. name
  PRIMARY KEY (id)
);
-- Role Table
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL, -- to hold role title
  salary DECIMAL (65,30) NOT NULL, -- to hold role salary
  department_id INT NOT NULL--foreign key references to dept (id)
  FOREIGN KEY (department_id)
  REFERENCES department (id)
  ON DELETE SET NULL,
  PRIMARY KEY (id)
);
-- Employee table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL, --foreign key refrences on role (id)
  manager_id INT, --holds 
  FOREIGN KEY (role_id)
  REFERENCES role (id),
  FOREIGN KEY (manager_id)
  REFERENCES employee (id),
  PRIMARY KEY (id)
);


USE employee_tracker_db;

INSERT INTO department (name)
VALUES("Sales"),
      ("Engineering"),
      ("Finance"),
      ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES("Sales Manager", 100000, 1),
      ("Sales Associate", 70000, 1), 
      ("Engineering Manager", 100000, 2),
      ("Engineer", 80000, 2),
      ("Finance Manger", 100000, 3),
      ("Finance Associate", 75000, 3),
      ("Legal Manager", 100000, 4),
      ("Legal Associate", 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id)
VALUES("Joshua","Goeke", 1, NULL, 1),
      ("MJ","Jeong", 2, 1, 1),
      ("Rebecca","Victra",3, NULL, 2),
      ("Jack","Titanic", 4, 3, 2),
      ("Janet","Jackson",5,NULL,3),
      ("John","Johnson",6,5,3),
      ("Cheek","Butt",7,NULL,4),
      ("Mars","Elon",8,7,4);
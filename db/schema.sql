-- Schema should contain the following 3 tables
-- Deparment
-- -id: INT PRIMARY KEY
-- -name: VARCHAR(30) to hold department name
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

-- Role
-- -id: INT PRIMARY KEY
-- -title: VARCHAR(30) to hold role title
-- -salary: DECIMAL to hold salary
-- -department_id: INT to hold reference to department role belongs to
CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);
-- Employee
-- -id: INT PRIMARY KEY
-- -first_name: VARCHAR(30) to hold first name
-- -last_name: VARCHAR(30) to hold last name
-- -role_id: INT to hold reference to employee role
-- -manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

SELECT * FROM department;
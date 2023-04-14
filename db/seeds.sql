-- used to populate the database tables for the development of individual features

INSERT INTO department (name)
VALUES ("Financing"),
       ("Legal"),
       ("Security"),
       ("Maintenance");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Security Guard", 40000, 3),
       ("Lawyer", 100000, 2),
       ("Accountant", 80000, 1),
       ("Technician", 90000, 4),
       ("Salesperson", 70000, 1),
       ("Manager", 90000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Johnson", 1, NULL),
    ("Paul", "Paulson", 3, 5),
    ("Ron", "Ronson", 4, NULL),
    ("Kat", "Katson", 2, NULL),
    ("Dalila", "Dolph", 6, NULL),
    ("Daniela", "Ferdi", 5, 5),
    ("Eva", "Mwangi", 5, 5),
    ("Arlo", "Suzi", 3, 5),
    ("Jesse", "Shakil", 2, NULL);


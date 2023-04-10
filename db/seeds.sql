-- used to populate the database tables for the development of individual features

INSERT INTO department (id, name)
VALUES (1, "Financing"),
       (2, "Human Resources"),
       (3, "Security"),
       (4, "Research"),
       (5, "Development");
       
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Security Guard", 20000, 3),
       (2, "Manager", 50000, 1),
       (3, "Scientist", 45000, 4),
       (4, "Technician", 30000, 5),
       (5, "Janitor", 22000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Austin", "Lewis", 4, 3),
       (2, "John", "Smith", 5, null),
       (3, "Enrico", "Pucci", 2, null),
       (4, "Constantin", "Valdor", 1, null),
       (5, "Ferrus", "Manus", 3, 3);


--MOSTLY PRACTICE ON EXISTING DATABASE STUFF
-- SELECT
--   CONCAT(employee.first_name, ' ', employee.last_name) AS Name, role.title AS Role
-- FROM employee JOIN role
-- ON employee.role_id = role.id;


-- SELECT CONCAT(tablea.first_name, ' ', tablea.last_name) AS "Employee Name",
--     CONCAT(tableb.first_name, ' ', tableb.last_name) AS "Manager's Name"
-- FROM employee AS tablea
-- INNER JOIN employee AS tableb
-- ON tablea.manager_id = tableb.id;

-- SELECT
--   role.title AS "Role Title", department.name AS "Department Name"
-- FROM role JOIN department
-- ON role.department_id = department.id;
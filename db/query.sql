
--MOSTLY PRACTICE ON EXISTING DATABASE STUFF
-- SELECT CONCAT(e.first_name, ' ', e.last_name) AS Name, 
--        r.title AS Role, 
--        CONCAT(m.first_name, ' ', m.last_name) AS Manager 
-- FROM employee e 
-- JOIN role r ON e.role_id = r.id 
-- LEFT JOIN employee m ON e.manager_id = m.id;


-- SELECT CONCAT(tablea.first_name, ' ', tablea.last_name) AS "Employee Name",
--     CONCAT(tableb.first_name, ' ', tableb.last_name) AS "Manager's Name"
-- FROM employee AS tablea
-- INNER JOIN employee AS tableb
-- ON tablea.manager_id = tableb.id;

-- SELECT
--   role.title AS "Role Title", department.name AS "Department Name", role.salary AS "Salary"
-- FROM role JOIN department
-- ON role.department_id = department.id;
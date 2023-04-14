const inquirer = require("inquirer");
const path = require('path');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/connection');

//***CONNECTS TO DATABASE */
db.connect(function(err) {
    if (err) throw err;
    console.log('***Database connected!***');
    startPrompt();
});

//***BEGINS PROMPT */
let startPrompt = function () {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do? (Use arrow keys)",
        name: "prompt",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update An Employee Role",
            "Exit"
        ]
    }).then((answersObj) => {

        //***ALLOWS USER TO VIEW DEPARTMENTS */
        if (answersObj.prompt === "View All Departments") {
            db.query('SELECT * FROM department', (err, result) => {
                if (err) throw err;
                console.log('***Viewing all departments!***');
                console.table(result);
                startPrompt();
            });

        //***ALLOWS USER TO VIEW ROLES */
        } else if (answersObj.prompt === "View All Roles") {
            db.query(`SELECT role.title AS "Role Title", department.name AS "Department Name", role.salary AS "Salary" FROM role JOIN department ON role.department_id = department.id;`, (err, result) => {
                if (err) throw err;
                console.log('***Viewing all roles!***');
                console.table(result);
                startPrompt();
            });

        //***ALLOWS USER TO VIEW EMPLOYEES */
        } else if (answersObj.prompt === "View All Employees") {
            db.query(`SELECT CONCAT(e.first_name, ' ', e.last_name) AS Name, r.title AS Role, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employee e JOIN role r ON e.role_id = r.id LEFT JOIN employee m ON e.manager_id = m.id`, (err, result) => {
                if (err) throw err;
                console.log('***Viewing all employees!***');
                console.table(result);
                startPrompt();
              });

        //***ALLOWS USER TO ADD A DEPARTMENT */
        } else if (answersObj.prompt === "Add A Department") {
           inquirer.prompt(
            {
                name: "departmentName",
                message: "What is the name of the department you would like to add?"
            }
           ).then((depAnswer) => {
                const newDepartmentName = depAnswer.departmentName;
                db.query(`INSERT INTO department (name) VALUES ('${newDepartmentName}')`, (err, result) => {
                    if (err) throw err;
                    console.log(`***Department ${newDepartmentName} has been added***`);
                    startPrompt();
                });
            });

        //***ALLOWS USER TO ADD A ROLE */
        } else if (answersObj.prompt === "Add A Role") {
            db.query('SELECT * FROM department', (err, result) => {
                if (err) throw err;
                const departmentChoices = result.map(department => department.name);
                inquirer.prompt([
                    {
                        name: "roleName",
                        message: "What is the name of the role you would like to add?"
                    },
                    {
                        name: "roleSalary",
                        message: "What is the salary for this role?"
                    },
                    {
                        name: "roleDepartment",
                        message: "What department does this role belong to?",
                        type: "list",
                        choices: departmentChoices
                    }
                ]).then((roleAnswer) => {
                    const newRoleName = roleAnswer.roleName;
                    const newRoleSalary = roleAnswer.roleSalary;
                    const departmentId = result.find(department => department.name === roleAnswer.roleDepartment).id;
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${newRoleName}', ${newRoleSalary}, ${departmentId})`, (err, result) => {
                        if (err) throw err;
                        console.log(`***Role ${newRoleName} has been added***`);
                        startPrompt();
                    });
                });
            });

        //***ALLOWS USER TO ADD AN EMPLOYEE */
        } else if (answersObj.prompt === "Add An Employee") {
            db.query('SELECT * FROM role', (err, result) => {
                if (err) throw err;
                const roleChoices = result.map(role => role.title);
                db.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employee', (err, result) => {
                  if (err) throw err;
                  const managerChoices = result.map(employee => employee.name);
                  managerChoices.push("NULL");
                  inquirer.prompt([
                    {
                      name: "firstName",
                      message: "What is the employee's first name?"
                    },
                    {
                      name: "lastName",
                      message: "What is the employee's last name?"
                    },
                    {
                      name: "eRole",
                      message: "What is the employee's role?",
                      type: "list",
                      choices: roleChoices
                    },
                    {
                      name: "eManager",
                      message: "Who is the employee's manager? (Select NULL if no manager)",
                      type: "list",
                      choices: managerChoices
                    }
                  ]).then((empAnswer) => {
                    const newFirstName = empAnswer.firstName;
                    const newLastName = empAnswer.lastName;
                    const newRole = empAnswer.eRole;
                    const newManager = empAnswer.eManager;
                        db.query(`SELECT id FROM role WHERE title = '${newRole}'`, (err, result) => {
                        if (err) throw err;
                        const roleId = result[0].id;
                            //***IF NO MANAGER IS SELECTED, SETS DEFAULT VALUE OF NULL */
                            if (newManager === "NULL") {
                                db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${newFirstName}', '${newLastName}', ${roleId})`, (err, result) => {
                                if (err) throw err;
                                console.log(`***Employee ${newFirstName} ${newLastName} has been added***`);
                                startPrompt();
                                });
                            //***OTHERWISE, ADDS ALL NEW INFO TO DATABASE */
                            } else db.query(`SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = '${newManager}'`, (err, result) => {
                                if (err) throw err;
                                const managerId = result[0].id;
                                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newFirstName}', '${newLastName}', ${roleId}, ${managerId})`, (err, result) => {
                                    if (err) throw err;
                                    console.log(`***Employee ${newFirstName} ${newLastName} has been added***`);
                                    startPrompt();
                                    });
                            });
                    });
                  });
                });
              });

        //***ALLOWS USER TO UPDATE AN EMPLOYEE'S ROLE */
        } else if (answersObj.prompt === "Update An Employee Role") {
            db.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employee', (err, result) => {
                if (err) throw err;
                const employeeChoice = result.map(employee => employee.name);
                db.query('SELECT * FROM role', (err, result) => {
                    if (err) throw err;
                    const roleChoices = result.map(role => role.title);
                    inquirer.prompt([
                        {
                            name: "empName",
                            message: "Select an employee you would like to update",
                            type: "list",
                            choices: employeeChoice
                        },
                        {
                            name: "newRole",
                            message: "What is the employee's new role?",
                            type: "list",
                            choices: roleChoices
                        }
                    ]).then((updAnswer) => {
                        const empName = updAnswer.empName;
                        const roleId = result.find(role => role.title === updAnswer.newRole).id;
                        db.query(`UPDATE employee SET role_id = ${roleId} WHERE CONCAT(first_name, " ", last_name) = '${empName}'`, (err, result) => {
                            if (err) throw err;
                            console.log(`***Employee ${empName} has been updated***`);
                            startPrompt();
                        });
                    });
                });
            });
            
        //***ALLOWS USER TO EXIT DATABASE */
    } else if (answersObj.prompt === "Exit") {
            db.end();
            console.log('***EXITING DATABASE***');
        }
    }).catch((err) => {
        console.log(err);
    });
};


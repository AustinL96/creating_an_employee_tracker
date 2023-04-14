//*** INQUIRER OPTIONS */
/*VIEW ALL DEPARTMENTS (shown a formatted table showing department names and ids,

VIEW ALL ROLES (shown job title, role id, department they belong to, and salary),

VIEW ALL EMPLOYEES (shown a formatted table showing employee data: ids, first names, last names, job titles, departments, salaries, and managers they repot to),

ADD A DEPARTMENT (when chosen, prompted to enter the name of the department and that department is added to the database),

ADD A ROLE (when chosen, prompted to enter the name, salary, and department for the role and that is added to the database), 

ADD AN EMPLOYEE (when chosen, prompted to enter the exployee's first name, last name, role, manager, and that employee is added to the database),

UPDATE AN EMPLOYEE ROLE (when chosen, prompted to select an employee to update and their new role and this ifnromation is updated in the database)*/

const inquirer = require("inquirer");
const path = require('path');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/connection');

db.connect(function(err) {
    if (err) throw err;
    console.log('***Database connected!***');
    startPrompt();
});

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
        if (answersObj.prompt === "View All Departments") {
            db.query('SELECT * FROM department', (err, result) => {
                if (err) throw err;
                console.log('***Viewing all departments!***');
                console.table(result);
                startPrompt();
            });
        } else if (answersObj.prompt === "View All Roles") {
            db.query('SELECT * FROM role', (err, result) => {
                if (err) throw err;
                console.log('***Viewing all roles!***');
                console.table(result);
                startPrompt();
            });
        } else if (answersObj.prompt === "View All Employees") {
            db.query('SELECT * FROM employee', (err, result) => {
                if (err) throw err;
                console.log('***Viewing all employees!***');
                console.table(result);
                startPrompt();
            });
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
        } else if (answersObj.prompt === "Exit") {
            db.end();
            console.log('***EXITING DATABASE***');
        }
    }).catch((err) => {
        console.log(err);
    });
};
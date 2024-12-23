import express from 'express';
import { QueryResult } from 'pg';
import inquirer from 'inquirer';
import { employee, connectToDb } from './connection.js';
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'company_db'
});

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Function to query the database
function queryDatabase(query: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.execute(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to view all departments
async function viewDepartments() {
  const results = await queryDatabase('SELECT department_id, department_name FROM departments');
  console.table(results);
}

// Function to view all roles
async function viewRoles() {
  const results = await queryDatabase(`
    SELECT r.role_id, r.job_title, d.department_name, r.salary
    FROM roles r
    JOIN departments d ON r.department_id = d.department_id
  `);
  console.table(results);
}
// Function to view all employees
async function viewEmployees() {
  const results = await queryDatabase(`
    SELECT e.employee_id, e.first_name, e.last_name, r.job_title, d.department_name, e.salary, 
           m.first_name AS manager_first_name, m.last_name AS manager_last_name
    FROM employees e
    JOIN roles r ON e.role_id = r.role_id
    JOIN departments d ON r.department_id = d.department_id
    LEFT JOIN employees m ON e.manager_id = m.employee_id
  `);
  console.table(results);
}

// Function to add a department
async function addDepartment() {
  const { department_name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'department_name',
      message: 'Enter the name of the department:'
    }
  ]);

  await queryDatabase('INSERT INTO departments (department_name) VALUES (?)', [department_name]);
  console.log('Department added successfully!');
}

// Function to add a role
async function addRole() {
  const departments = await queryDatabase('SELECT * FROM departments');
  const departmentChoices = departments.map((dept: any) => ({
    name: dept.department_name,
    value: dept.department_id
  }));

  const { job_title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'job_title',
      message: 'Enter the job title for the role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:'
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departmentChoices
    }
  ]);

  await queryDatabase('INSERT INTO roles (job_title, department_id, salary) VALUES (?, ?, ?)', [job_title, department_id, salary]);
  console.log('Role added successfully!');
}

// Main function to run the application
async function main() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
      ]
    }
  ]);

  switch (action) {
    case 'View all departments':
      await viewDepartments();
      break;
    case 'View all roles':
      await viewRoles();
      break;
    case 'View all employees':
      await viewEmployees();
      break;
    case 'Add a department':
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
  }

  await main();
}

// Start the application
main().catch((err) => {
  console.error('Error:', err);
  db.end();
});

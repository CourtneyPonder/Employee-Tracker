INSERT INTO department (id, department_name)
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'Sales Lead', 100000, 1),
       (2, 'Sales Person', 50000, 1),
       (3, 'Lead Engineer', 150000, 2),
       (4, 'Account Manager', 125000, 3),
       (5, 'Accountant', 85000, 3),
       (6, 'Legal Team Leader', 200000, 4),
       (7, 'Lawyer', 195000, 4);

INSERT INTO employee (id, first_name, last_name, last_name, title, departments_name, salary, manager)
VALUES (1, 'John', 'Doe', 'Sales Lead', 'Sales', 100000),
       (2, 'Mike', 'Chan', 'Sales Person', 'Sales', 50000, 'John Doe'),
       (3, 'Ashley', 'Rodriguez', 'Lead Engineer', 'Engineering', 150000),
       (4, 'Kevin', 'Tupik', 'Account Manager', 125000, 'Finance', 'Ashley Rodriguez'),
       (5, 'Sarah', 'Lourd', 'Accountant', 85000, 'Finance'),
       (6, 'Tom', 'Allen', 'Legal Team Leader', 'Legal', 200000, 'Sarah Lourd'),
       (7, 'Courtney', 'Ponder', 'Lawyer', 'Legal', 195000);
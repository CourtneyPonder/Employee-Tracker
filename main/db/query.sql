SELECT e.employee_id, e.first_name, e.last_name, r.job_title, d.department_name, e.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
FROM employees e
JOIN roles r ON e.role_id = r.role_id
JOIN departments d ON r.department_id = d.department_id
LEFT JOIN employees m ON e.manager_id = m.employee_id;
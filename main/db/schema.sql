CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    departments_name VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title INTEGER NOT NULL,
    departments_name INTEGER,
    salary DECIMAL NOT NULL,
    manager VARCHAR(30),
    FOREIGN KEY (title) REFERENCES roles(title),
    FOREIGN KEY (department_id) REFERENCES departments(departments_name) ON DELETE SET NULL
    FOREIGN KEY (salary) REFERENCES roles(salary),
);
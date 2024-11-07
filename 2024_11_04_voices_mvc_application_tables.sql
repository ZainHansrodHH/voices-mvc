CREATE TABLE job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    job_description TEXT,
    job_location_country ENUM('Canada', 'USA') NOT NULL,
    job_location_state VARCHAR(100) NOT NULL,
    job_reference_file VARCHAR(255),
    job_budget_min INT NOT NULL,
    job_budget_max INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
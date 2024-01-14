CREATE DATABASE pern;

CREATE TABLE programs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL NOT NULL,
  domain VARCHAR(255) NOT NULL,
  program_type VARCHAR(255) NOT NULL,
  registrations VARCHAR(20) NOT NULL,
  description TEXT,
  placement_assurance BOOLEAN NOT NULL,
  image_url VARCHAR(255),
  university_name VARCHAR(255),
  faculty_profile VARCHAR(255),
  learning_hours INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  certificate_diploma VARCHAR(255),
  eligibility_criteria VARCHAR(255)
);

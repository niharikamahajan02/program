CREATE DATABASE pern;

CREATE TABLE programs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) ,
  price DECIMAL ,
  domain VARCHAR(255) ,
  program_type VARCHAR(255) ,
  registrations VARCHAR(20) ,
  description TEXT,
  placement_assurance BOOLEAN ,
  image_url VARCHAR(255),
  university_name VARCHAR(255),
  faculty_profile VARCHAR(255),
  learning_hours INTEGER ,
  duration INTEGER ,
  certificate_diploma VARCHAR(255),
  eligibility_criteria VARCHAR(255)
);

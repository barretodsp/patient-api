CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SET CLIENT_ENCODING = 'UTF8';
CREATE ROLE patientapi WITH LOGIN PASSWORD 'www';
ALTER ROLE patientapi CREATEDB;
CREATE DATABASE database_test WITH ENCODING 'UTF8';
CREATE DATABASE database_development WITH ENCODING 'UTF8';

\c database_development;

CREATE TABLE patients (
  patient_id uuid NOT NULL,
  cpf varchar(11) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  birth_dt DATE NOT NULL,
  blood_type varchar(3),
  created_dt TIMESTAMP NOT NULL,
  PRIMARY KEY (patient_id)
);
GRANT ALL PRIVILEGES ON TABLE patients TO patientapi;
GRANT SELECT ON patients TO patientapi;

CREATE TABLE contacts (
  contact_id uuid NOT NULL,
  patient_id uuid NOT NULL,
  contact_number VARCHAR(30) NOT NULL,
  created_dt TIMESTAMP NOT NULL,
  PRIMARY KEY (contact_id),
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE

);
GRANT ALL PRIVILEGES ON TABLE contacts TO patientapi;
GRANT SELECT ON contacts TO patientapi;

\c database_test;

CREATE TABLE patients (
  patient_id uuid NOT NULL,
  cpf varchar(11) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  birth_dt DATE NOT NULL,
  blood_type varchar(3),
  created_dt TIMESTAMP NOT NULL,
  PRIMARY KEY (patient_id)
);
GRANT ALL PRIVILEGES ON TABLE patients TO patientapi;
GRANT SELECT ON users TO patientapi;

CREATE TABLE contacts (
  contact_id uuid NOT NULL,
  patient_id uuid NOT NULL,
  contact_number VARCHAR(30) NOT NULL,
  PRIMARY KEY (contact_id),
  created_dt TIMESTAMP NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE

);
GRANT ALL PRIVILEGES ON TABLE contacts TO patientapi;
GRANT SELECT ON contacts TO patientapi;


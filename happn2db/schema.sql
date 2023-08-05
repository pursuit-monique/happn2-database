DROP DATABASE IF EXISTS happn2db;
CREATE DATABASE happn2db;
\c happn2db

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_raster;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS postgis_sfcgal;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
CREATE EXTENSION IF NOT EXISTS address_standardizer;
CREATE EXTENSION IF NOT EXISTS address_standardizer_data_us;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    f_name VARCHAR(30),
    l_name VARCHAR(30),
    username VARCHAR(16),
    picture TEXT,
    about TEXT,
    organization_id INT,
    role_id INT,
    linkedin TEXT,
    contact VARCHAR(30),
    interests VARCHAR(30)
)
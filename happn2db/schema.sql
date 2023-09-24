DROP DATABASE IF EXISTS happn2db;
CREATE DATABASE happn2db;
\c happn2db

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
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
    user_type VARCHAR(10),
    organization_id INT,
    role_id INT,
    linkedin TEXT,
    contact VARCHAR(30),
    interests VARCHAR(30)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    info VARCHAR(80),
    about TEXT,
    picture TEXT,
    start_date DATE,
    end_date DATE,
    address TEXT,
    lat FLOAT,
    lng FLOAT,
    organization_id INT,
    cause_id INT,
    type_id INT,
    locale_info TEXT,
    tags TEXT
);

CREATE TABLE causes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    about TEXT,
    picture TEXT
);


CREATE TABLE types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    about TEXT,
    picture TEXT
);


CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    history TEXT,
    about TEXT,
    picture TEXT,
    website TEXT,
    type_id INT,
    cause_id INT,
    contact VARCHAR(30)
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    about TEXT,
    supervisor_id INT,
    organization_id INT,
    is_moderator BOOLEAN
);


CREATE TABLE broadcasts (
    id SERIAL PRIMARY KEY,
    event_id INT,
    user_id INT,
    room_id TEXT,
    title VARCHAR(30),
    about TEXT,
    room_codes JSON,
    created_at TEXT
);
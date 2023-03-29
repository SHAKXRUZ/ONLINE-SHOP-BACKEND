CREATE DATABASE cars_db;

\c cars_db;

CREATE TABLE users (
    id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    email_id VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    company_id VARCHAR(50)
);

CREATE TABLE emails (
    id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE company (
    id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR(50) NOT NULL,
    email_id VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    created_by VARCHAR(50)
);

CREATE TABLE cars (
    id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    car_title VARCHAR(50) NOT NULL,
    car_price VARCHAR(50) NOT NULL,
    car_color VARCHAR(50) NOT NULL,
    car_brand VARCHAR(50) NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    company_id VARCHAR(50) NOT NULL
);

CREATE TABLE customers (
    id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    user_id VARCHAR(50) NOT NULL,
    car_id VARCHAR(50) NOT NULL,
    company_id VARCHAR(50) NOT NULL,
    created_at VARCHAR NOT NULL
);

CREATE TABLE session (
    id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    user_id VARCHAR(50) NOT NULL,
    start_at VARCHAR NOT NULL,
    end_at VARCHAR NOT NULL
);

ALTER TABLE
    users
ADD
    CONSTRAINT fk_email_id FOREIGN KEY (email_id) REFERENCES emails(id);

ALTER TABLE
    users
ADD
    CONSTRAINT fk_company_id FOREIGN KEY(company_id) REFERENCES company(id);

ALTER TABLE
    company
ADD
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id);

ALTER TABLE
    company
ADD
    CONSTRAINT fk_email_id FOREIGN KEY (email_id) REFERENCES emails(id);

ALTER TABLE
    cars
ADD
    CONSTRAINT fk_created_by FOREIGN KEY(created_by) REFERENCES users(id);

ALTER TABLE
    cars
ADD
    CONSTRAINT fk_company_id FOREIGN KEY(company_id) REFERENCES company(id);

ALTER TABLE
    session
ADD
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id);

ALTER TABLE
    customers
ADD
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id);

ALTER TABLE
    customers
ADD
    CONSTRAINT fk_car_id FOREIGN KEY(car_id) REFERENCES cars(id);

ALTER TABLE
    customers
ADD
    CONSTRAINT fk_company_id FOREIGN KEY(company_id) REFERENCES company(id);


-- emails values
INSERT INTO
    emails(title)
VALUES
    ('ismoilovshakhruz250000@gmail.com');

-- users values
INSERT INTO
    users(name, age, email_id, password, role)
VALUES
    (
        'shakhruzbek',
        19,
        '730a9bbc-f2a3-4611-9b25-ab93a22bd5c8',
        '20030625',
        'user'
    );

-- company values
INSERT INTO
    company(title, email_id, address, created_by)
VALUES
    (
        'BMW',
        'fb7e3b72-95d9-4308-ad43-5ec1cf94dfa2',
        'qayirdir',
        'e439ef4b-5db2-4e28-b8ee-9780996b3b9frs'
    );

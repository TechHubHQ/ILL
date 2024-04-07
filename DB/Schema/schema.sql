-- Create the "ill_users" table
CREATE TABLE IF NOT EXISTS ill_users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL
);

-- Create the "sports_details" table
CREATE TABLE IF NOT EXISTS sports_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    std_name VARCHAR(100) NOT NULL,
    std_department VARCHAR(100) NOT NULL,
    sport VARCHAR(50) NOT NULL,
    gender VARCHAR(50) NOT NULL
);

-- Create the "idea_details" table
CREATE TABLE IF NOT EXISTS idea_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(100) NOT NULL,
    idea VARCHAR(1000) NOT NULL,
    submitted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
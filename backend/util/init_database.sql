-- we use sqlite as the primary database

-- create user table
CREATE TABLE IF NOT EXISTS User(
    username TEXT PRIMARY KEY ,
    password TEXT NOT NULL ,
    user_type TEXT,
    token TEXT
);
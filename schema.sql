DROP DATABASE IF EXISTS GAME_PICKER_DEV;
CREATE DATABASE IF NOT EXISTS GAME_PICKER_DEV;
USE GAME_PICKER_DEV;

-- DROP TABLE IF EXISTS game;
-- CREATE TABLE IF NOT EXISTS game(

-- );

DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user(
    user_id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    pwd VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id)
);

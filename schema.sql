DROP DATABASE IF EXISTS GAME_PICKER_DEV;
CREATE DATABASE IF NOT EXISTS GAME_PICKER_DEV;
USE GAME_PICKER_DEV;


DROP TABLE IF EXISTS game;
CREATE TABLE IF NOT EXISTS game(
    game_id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(game_id)
);

DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user(
    user_id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    pwd VARCHAR(100) NOT NULL,
    added_date DATETIME DEFAULT (CURRENT_DATE()),
    PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS rel_favorite;
CREATE TABLE IF NOT EXISTS rel_favorite(
    rel_id INT AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_game INT NOT NULL,
    PRIMARY KEY (rel_id),
    UNIQUE(id_user, id_game)
);

DROP TABLE IF EXISTS rel_friend;
CREATE TABLE IF NOT EXISTS rel_friend(
    rel_id INT AUTO_INCREMENT, 
    id_origin_user INT NOT NULL,
    id_friend_user INT NOT NULL,
    added_date DATETIME DEFAULT (CURRENT_DATE()),
    PRIMARY KEY(rel_id),
    FOREIGN KEY (id_origin_user) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (id_friend_user) REFERENCES user(user_id) ON DELETE CASCADE,
    UNIQUE(id_origin_user, id_friend_user)
);

DROP TABLE IF EXISTS game_review;
CREATE TABLE IF NOT EXISTS game_review(
    game_review_id INT AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_game INT NOT NULL,
    rating TINYINT NOT NULL,
    review_message VARCHAR(5000) NOT NULL,
    PRIMARY KEY (game_review_id)
);

DROP TABLE IF EXISTS release_notification;
CREATE TABLE IF NOT EXISTS release_notification(
    notification_id INT AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_game INT NOT NULL,
    PRIMARY KEY (notification_id)
);

ALTER TABLE rel_favorite ADD FOREIGN KEY (id_user) REFERENCES user(user_id);
ALTER TABLE release_notification ADD FOREIGN KEY (id_user) REFERENCES user(user_id);
ALTER TABLE game_review ADD FOREIGN KEY (id_user) REFERENCES user(user_id);

insert into user(username, email, pwd) values("test", "test@gmail.com", "test");
insert into user(username, email, pwd) values("test2", "test2@gmail.com", "test");
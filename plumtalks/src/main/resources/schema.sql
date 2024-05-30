DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS user_role_junction;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role;
DROP TRIGGER IF EXISTS triggername;

CREATE TABLE user
(
    userId           INT AUTO_INCREMENT PRIMARY KEY,
    username         NVARCHAR(50) UNIQUE,
    password         NVARCHAR(100),
    verificationCode NVARCHAR(100),
    enabled          BIT
);

CREATE TABLE role
(
    roleId    INT AUTO_INCREMENT PRIMARY KEY,
    authority NVARCHAR(30)
);

CREATE TABLE user_role_Junction
(
    userId INT NOT NULL,
    roleId INT NOT NULL,

    PRIMARY KEY (userId, roleId),
    FOREIGN KEY (userId) REFERENCES User (userId) ON DELETE CASCADE,
    FOREIGN KEY (roleId) REFERENCES Role (roleId) ON DELETE CASCADE
);

CREATE TABLE profile
(
    userId      INT,
    displayName NVARCHAR(30),

    FOREIGN KEY (userId) REFERENCES User (userId) ON DELETE CASCADE
);

CREATE TABLE message
(
    messageId  BIGINT AUTO_INCREMENT PRIMARY KEY,
    senderId   INT,
    receiverId INT,
    content    NVARCHAR(255),
    timestamp  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER triggername
    AFTER INSERT ON user
FOR EACH ROW
    INSERT INTO profile(userId, displayName) VALUES (NEW.userId, CONCAT(NEW.username, 'mkd'));
CREATE TABLE Users (
    user_id VARCHAR(20) NOT NULL PRIMARY KEY,
    password VARCHAR(30) NOT NULL,
);

CREATE TABLE Posts (
    post_id INT NOT NULL PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    title TEXT(100) NOT NULL,
    content TEXT(10000),
    lastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isEdited BOOLEAN DEFAULT 0,
    upvotes INT DEFAULT 0,
    downvotes INT NOT NULL DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
)

CREATE TABLE Comments (
    comment_id INT NOT NULL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    content TEXT(10000),
    lastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isEdited BOOLEAN,
    upvotes INT NOT NULL,
    downvotes INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES Users(user_id),
    FOREIGN KEY(post_id) REFERENCES Posts(post_id)
)
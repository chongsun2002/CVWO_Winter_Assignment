-- +goose Up
CREATE TABLE Users (
    UserID UUID PRIMARY KEY,
    Name TEXT NOT NULL,
    LastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Password VARCHAR(30) NOT NULL
);


-- +goose Down
DROP TABLE Users;

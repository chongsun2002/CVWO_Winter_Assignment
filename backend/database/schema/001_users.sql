-- +goose Up
CREATE TABLE Users (
    UserID UUID PRIMARY KEY,
    Name TEXT UNIQUE NOT NULL,
    Email CITEXT UNIQUE NOT NULL, 
    LastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Password VARCHAR(60) NOT NULL
);

-- +goose Down
DROP TABLE Users;

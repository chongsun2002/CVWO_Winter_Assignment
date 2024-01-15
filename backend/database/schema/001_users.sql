-- +goose Up
CREATE TABLE Users (
    UserID UUID PRIMARY KEY,
    Name TEXT NOT NULL,
    Email CITEXT NOT NULL, 
    LastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Password VARCHAR(30) NOT NULL
);

-- +goose Down
DROP TABLE Users;

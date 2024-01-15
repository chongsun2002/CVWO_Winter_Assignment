-- +goose Up

CREATE TABLE Posts (
    PostID UUID PRIMARY KEY,
    Title TEXT NOT NULL,
    Content TEXT,
    Topic TEXT,
    LastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsEdited BOOLEAN NOT NULL DEFAULT FALSE,
    Upvotes INT NOT NULL DEFAULT 0,
    Downvotes INT NOT NULL DEFAULT 0,
    UserID UUID REFERENCES Users(UserID) ON DELETE CASCADE
);

-- +goose Down

DROP TABLE Posts;
-- +goose Up

CREATE TABLE Posts (
    PostID UUID PRIMARY KEY,
    Title TEXT NOT NULL,
    Content TEXT,
    LastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IsEdited BOOLEAN DEFAULT FALSE,
    Upvotes INT DEFAULT 0,
    Downvotes INT DEFAULT 0,
    UserID UUID REFERENCES Users(UserID) ON DELETE CASCADE
);

-- +goose Down

DROP TABLE Posts;
-- +goose Up

CREATE TABLE Comments (
    CommentID UUID PRIMARY KEY,
    Content TEXT,
    LastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsEdited BOOLEAN NOT NULL DEFAULT FALSE,
    Upvotes INT NOT NULL DEFAULT 0,
    Downvotes INT NOT NULL DEFAULT 0,
    UserID UUID REFERENCES Users(UserID) ON DELETE CASCADE,
    PostID UUID REFERENCES Posts(PostID) ON DELETE CASCADE
);

-- +goose Down

DROP TABLE Comments;
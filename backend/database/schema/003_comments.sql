-- +goose Up

CREATE TABLE Comments (
    CommentID UUID PRIMARY KEY,
    Content TEXT,
    LastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IsEdited BOOLEAN DEFAULT FALSE,
    Upvotes INT NOT NULL,
    Downvotes INT NOT NULL,
    UserID UUID REFERENCES Users(UserID) ON DELETE CASCADE,
    PostID UUID REFERENCES Posts(PostID) ON DELETE CASCADE
);

-- +goose Down

DROP TABLE Comments;
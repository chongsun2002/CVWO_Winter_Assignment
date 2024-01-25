-- name: CreateComment :one
INSERT INTO Comments (CommentID, Content, LastModified, IsEdited, Upvotes, Downvotes, UserID, PostID)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;
--

-- name: EditComment :execrows
UPDATE Comments
SET Content = $3, IsEdited = true
WHERE UserID = $2 and CommentID = $1;
--

-- name: DeleteComment :execrows
UPDATE Comments
SET Content = 'Deleted'
WHERE UserID = $2 and CommentID = $1;
--

-- name: GetComments :many
SELECT * FROM Comments 
WHERE PostID = $1;
--
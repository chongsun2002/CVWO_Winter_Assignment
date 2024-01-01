-- name: CreatePost :one
INSERT INTO Posts (PostID, Content, LastModified, IsEdited, Upvotes, Downvotes, UserID)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
--

-- name: editPost :exec
UPDATE Posts
SET Content = $3, IsEdited = true
WHERE UserID = $2 and PostID = $1;
--

-- name: deletePost :exec
UPDATE Posts
SET Content = "Deleted"
WHERE UserID = $2 and PostID = $1;
--

-- name: getPost :many
SELECT * FROM Posts 
WHERE PostID = $1;
--
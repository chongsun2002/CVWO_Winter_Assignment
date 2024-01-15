-- name: createPost :one
INSERT INTO Posts (PostID, Title, Content, Topic, LastModified, IsEdited, Upvotes, Downvotes, UserID)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;
--

-- name: editPost :exec
UPDATE Posts
SET Content = $3, IsEdited = true, LastModified=$4
WHERE UserID = $2 and PostID = $1;
--

-- name: deletePost :exec
UPDATE Posts
SET Content = "Deleted"
WHERE UserID = $2 and PostID = $1;
--

-- name: getPosts :many
SELECT * FROM Posts 
WHERE PostID = $1 and Topic = $2
ORDER BY PostID
OFFSET $3
LIMIT $4;
--
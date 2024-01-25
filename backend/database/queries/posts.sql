-- name: CreatePost :one
INSERT INTO Posts (PostID, Title, Content, Topic, LastModified, IsEdited, Upvotes, Downvotes, UserID, Name)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *;
--

-- name: EditPost :execrows
UPDATE Posts
SET Content = $3, IsEdited = true, LastModified=$4
WHERE UserID = $2 and PostID = $1;
--

-- name: DeletePost :execrows
UPDATE Posts
SET Content = 'Deleted'
WHERE UserID = $2 and PostID = $1;
--

-- name: GetPostByID :one
SELECT * FROM Posts 
WHERE PostID = $1;
--

-- name: GetPosts :many
SELECT * FROM Posts
WHERE (Topic = $1 OR $1 IS NULL)
OFFSET $2
LIMIT $3;
--
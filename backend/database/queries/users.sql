-- name: CreateUser :one
INSERT INTO users (UserID, Name, LastModified, Password)
VALUES ($1, $2, $3, $4)
RETURNING *;
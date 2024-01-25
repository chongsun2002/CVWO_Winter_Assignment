-- name: CreateUser :one
INSERT INTO Users (UserID, Name, Email, LastModified, Password)
VALUES ($1, $2, $3, $4, $5)
RETURNING UserID, Name;
--

-- name: ChangePassword :execrows
UPDATE Users 
SET Password = $3
WHERE Name = $1 and Password = $2;
--

-- name: AuthenticateUser :one
SELECT UserID, Name FROM Users
WHERE Name = $1 AND Password = $2;
--
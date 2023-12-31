// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: users.sql

package database

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const authenticateUser = `-- name: AuthenticateUser :one

SELECT count(*) FROM Users
WHERE Name = $1 AND Password = $2
`

type AuthenticateUserParams struct {
	Name     string
	Password string
}

func (q *Queries) AuthenticateUser(ctx context.Context, arg AuthenticateUserParams) (int64, error) {
	row := q.db.QueryRowContext(ctx, authenticateUser, arg.Name, arg.Password)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const changePassword = `-- name: ChangePassword :execrows

UPDATE Users 
SET Password = $3
WHERE Name = $1 and Password = $2
`

type ChangePasswordParams struct {
	Name       string
	Password   string
	Password_2 string
}

func (q *Queries) ChangePassword(ctx context.Context, arg ChangePasswordParams) (int64, error) {
	result, err := q.db.ExecContext(ctx, changePassword, arg.Name, arg.Password, arg.Password_2)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected()
}

const createUser = `-- name: CreateUser :one
INSERT INTO Users (UserID, Name, LastModified, Password, Apikey)
VALUES ($1, $2, $3, $4, encode(sha256(random()::text::bytea), 'hex'))
RETURNING userid, name, lastmodified, password
`

type CreateUserParams struct {
	Userid       uuid.UUID
	Name         string
	Lastmodified time.Time
	Password     string
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.Userid,
		arg.Name,
		arg.Lastmodified,
		arg.Password,
	)
	var i User
	err := row.Scan(
		&i.Userid,
		&i.Name,
		&i.Lastmodified,
		&i.Password,
	)
	return i, err
}

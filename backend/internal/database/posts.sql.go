// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: posts.sql

package database

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const createPost = `-- name: CreatePost :one
INSERT INTO Posts (PostID, Content, LastModified, IsEdited, Upvotes, Downvotes, UserID)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING postid, title, content, lastmodified, isedited, upvotes, downvotes, userid
`

type CreatePostParams struct {
	Postid       uuid.UUID
	Content      sql.NullString
	Lastmodified time.Time
	Isedited     bool
	Upvotes      int32
	Downvotes    int32
	Userid       uuid.NullUUID
}

func (q *Queries) CreatePost(ctx context.Context, arg CreatePostParams) (Post, error) {
	row := q.db.QueryRowContext(ctx, createPost,
		arg.Postid,
		arg.Content,
		arg.Lastmodified,
		arg.Isedited,
		arg.Upvotes,
		arg.Downvotes,
		arg.Userid,
	)
	var i Post
	err := row.Scan(
		&i.Postid,
		&i.Title,
		&i.Content,
		&i.Lastmodified,
		&i.Isedited,
		&i.Upvotes,
		&i.Downvotes,
		&i.Userid,
	)
	return i, err
}

const deletePost = `-- name: deletePost :exec

UPDATE Posts
SET Content = "Deleted"
WHERE UserID = $2 and PostID = $1
`

type deletePostParams struct {
	Postid uuid.UUID
	Userid uuid.NullUUID
}

func (q *Queries) deletePost(ctx context.Context, arg deletePostParams) error {
	_, err := q.db.ExecContext(ctx, deletePost, arg.Postid, arg.Userid)
	return err
}

const editPost = `-- name: editPost :exec

UPDATE Posts
SET Content = $3, IsEdited = true
WHERE UserID = $2 and PostID = $1
`

type editPostParams struct {
	Postid  uuid.UUID
	Userid  uuid.NullUUID
	Content sql.NullString
}

func (q *Queries) editPost(ctx context.Context, arg editPostParams) error {
	_, err := q.db.ExecContext(ctx, editPost, arg.Postid, arg.Userid, arg.Content)
	return err
}

const getPost = `-- name: getPost :many

SELECT postid, title, content, lastmodified, isedited, upvotes, downvotes, userid FROM Posts 
WHERE PostID = $1
`

func (q *Queries) getPost(ctx context.Context, postid uuid.UUID) ([]Post, error) {
	rows, err := q.db.QueryContext(ctx, getPost, postid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Post
	for rows.Next() {
		var i Post
		if err := rows.Scan(
			&i.Postid,
			&i.Title,
			&i.Content,
			&i.Lastmodified,
			&i.Isedited,
			&i.Upvotes,
			&i.Downvotes,
			&i.Userid,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
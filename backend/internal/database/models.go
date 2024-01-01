// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0

package database

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Comment struct {
	Commentid    uuid.UUID
	Content      sql.NullString
	Lastmodified time.Time
	Isedited     bool
	Upvotes      int32
	Downvotes    int32
	Userid       uuid.NullUUID
	Postid       uuid.NullUUID
}

type Post struct {
	Postid       uuid.UUID
	Title        string
	Content      sql.NullString
	Lastmodified time.Time
	Isedited     bool
	Upvotes      int32
	Downvotes    int32
	Userid       uuid.NullUUID
}

type User struct {
	Userid       uuid.UUID
	Name         string
	Lastmodified time.Time
	Password     string
}

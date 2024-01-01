package main

import (
	"net/http"
	"github.com/chongsun2002/CVWO_Winter_Assignment/backend/internal/database"
)

type authedHandler func(http.ResponseWriter, *http.Request, database.User)


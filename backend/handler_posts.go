package main

import ("net/http"
		"fmt"
		"strconv"
		"github.com/chongsun2002/CVWO_Winter_Assignment/backend/internal/database"
		"database/sql"
		"encoding/json"
		"time"

		"github.com/google/uuid"
)

func (apiCfg *apiConfig) handlerGetPosts(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		offset int32
		count int32
		topic sql.NullString
		postid uuid.UUID
	}
	queryParams := r.URL.Query()
	offset, err := strconv.Atoi(queryParams.Get("offset"))
	if err != nil {
		panic(err)
	}
	count, err := strconv.Atoi(queryParams.Get("count"))
	if err != nil {
		panic(err)
	}
	topic := sql.NullString{String: queryParams.Get("topic"), Valid: true}
	if topic.String=="all" {
		topic = sql.NullString{String: "", Valid: false}
	}
	params := parameters{
		offset: int32(offset),
		count: int32(count),
		topic: topic,
		postid: uuid.MustParse(queryParams.Get("postid")),
	}

	posts, err := apiCfg.DB.GetPosts(r.Context(), database.GetPostsParams{
		Postid: params.postid,
		Topic: params.topic,
		Offset: params.offset,
		Limit:  params.count,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Unable to get posts: %v", err))
		return
	}
	respondWithJSON(w, http.StatusOK, posts)
}

func (apiCfg *apiConfig) handlerCreatePost(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Title string
		Content string
		Topic string
		UserID string
	}
	// Decode JSON to Go Struct
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Couldn't decode parameters: %v", err))
		return
	}
	location, err := time.LoadLocation("Asia/Singapore")
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Internal Server Error getting location: %v", err))
		return
	}
	id := uuid.MustParse(params.UserID)
	post, err := apiCfg.DB.CreatePost(r.Context(), database.CreatePostParams{
		Postid: uuid.New(),
		Title: params.Title,
		Content: sql.NullString{String: params.Content, Valid: true},
		Topic: sql.NullString{String: params.Topic, Valid: true},
		Lastmodified: time.Now().In(location),
		Isedited: false,
		Upvotes: 0,
		Downvotes: 0,
		Userid: uuid.NullUUID{UUID: id, Valid: true},
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Couldn't create post, error at Database API: %v", err))
	}
	respondWithJSON(w, http.StatusCreated, post)
}

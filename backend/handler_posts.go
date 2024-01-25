package main

import ("net/http"
		"fmt"
		"strconv"
		"github.com/chongsun2002/CVWO_Winter_Assignment/backend/internal/database"
		"database/sql"
		"encoding/json"
		"time"
		"github.com/go-chi/chi/v5"

		"github.com/google/uuid"
)

func (apiCfg *apiConfig) handlerGetPostByID(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		postid uuid.UUID
	}
	postid, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid PostID")
		return
	}
	params := parameters{
		postid: postid,
	}

	post, err := apiCfg.DB.GetPostByID(r.Context(), params.postid)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Unable to get post: %v", err))
		return
	}
	respondWithJSON(w, http.StatusOK, post)
}

func (apiCfg *apiConfig) handlerGetPostsList(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		offset int32
		count int32
		topic sql.NullString
	}
	queryParams := r.URL.Query()
	offset, err := strconv.Atoi(queryParams.Get("offset"))
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid offset")
		return
	}
	count, err := strconv.Atoi(queryParams.Get("count"))
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid count")
		return
	}
	topic := sql.NullString{String: queryParams.Get("topic"), Valid: true}
	if topic.String=="all" {
		topic = sql.NullString{Valid: false}
	}
	params := parameters{
		offset: int32(offset),
		count: int32(count),
		topic: topic,
	}
	fmt.Print(params);
	posts, err := apiCfg.DB.GetPosts(r.Context(), database.GetPostsParams{
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
		Name string
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
		Name: sql.NullString{String: params.Name, Valid: true},
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Couldn't create post, error at Database API: %v", err))
		return
	}
	respondWithJSON(w, http.StatusCreated, post)
}

func (apiCfg *apiConfig) handlerEditPost(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Postid       string
		Userid       string
		Content      string
	}
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
	postid := uuid.MustParse(params.Postid)
	userid := uuid.NullUUID{UUID: uuid.MustParse(params.Userid), Valid: true}
	if params.Userid == "" {
		userid.Valid = false
	}
	content := sql.NullString{String: params.Content, Valid: true}
	if params.Content == "" {
		content.Valid = false
	}
	rowsChanged, err := apiCfg.DB.EditPost(r.Context(), database.EditPostParams{
		Postid: postid,
		Userid: userid,
		Lastmodified: time.Now().In(location),
		Content: content,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Unable to update post: %v", err))
		return
	}
	if rowsChanged == 0 {
		respondWithJSON(w, http.StatusUnauthorized, fmt.Sprintf("Unable to update post: %v", err))
		return
	}
	respondWithJSON(w, http.StatusOK, rowsChanged)
}

func (apiCfg *apiConfig) handlerDeletePost(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Postid       string
		Userid       string
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Couldn't decode parameters: %v", err))
		return
	}
	postid := uuid.MustParse(params.Postid)
	userid := uuid.NullUUID{UUID: uuid.MustParse(params.Userid), Valid: true}
	if params.Userid == "" {
		userid.Valid = false
	}
	rowsChanged, err := apiCfg.DB.DeletePost(r.Context(), database.DeletePostParams{
		Postid: postid,
		Userid: userid,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Unable to delete post: %v", err))
		return
	}
	if rowsChanged == 0 {
		respondWithJSON(w, http.StatusUnauthorized, fmt.Sprintf("Unable to delete post: %v", err))
		return
	}
	respondWithJSON(w, http.StatusOK, rowsChanged)
}


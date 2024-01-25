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

func (apiCfg *apiConfig) handlerGetComments(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		postid uuid.NullUUID
		offset int32
		count int32
	}
	postid, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid PostID")
		return
	}
	post := uuid.NullUUID{UUID: postid, Valid: true}
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
	params := parameters{
		offset: int32(offset),
		count: int32(count),
		postid: post,
	}
	comments, err := apiCfg.DB.GetComments(r.Context(), database.GetCommentsParams{
		Postid: params.postid,
		Offset: params.offset,
		Limit:  params.count,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Unable to get comments: %v", err))
		return
	}
	respondWithJSON(w, http.StatusOK, comments)
}

func (apiCfg *apiConfig) handlerCreateComment(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Content string
		UserID string
		PostID string
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
	userid := uuid.MustParse(params.UserID)
	postid := uuid.MustParse(params.PostID)
	comment, err := apiCfg.DB.CreateComment(r.Context(), database.CreateCommentParams{
		Commentid: uuid.New(),
		Content: sql.NullString{String: params.Content, Valid: true},
		Lastmodified: time.Now().In(location),
		Isedited: false,
		Upvotes: 0,
		Downvotes: 0,
		Userid: uuid.NullUUID{UUID: userid, Valid: true},
		Postid: uuid.NullUUID{UUID: postid, Valid: true},
		Name: sql.NullString{String: params.Name, Valid: true},
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Couldn't create comment, error at Database API: %v", err))
		return
	}
	respondWithJSON(w, http.StatusCreated, comment)
}

func (apiCfg *apiConfig) handlerEditComment(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Commentid       string
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
	commentid := uuid.MustParse(params.Commentid)
	userid := uuid.NullUUID{UUID: uuid.MustParse(params.Userid), Valid: true}
	if params.Userid == "" {
		userid.Valid = false
	}
	content := sql.NullString{String: params.Content, Valid: true}
	if params.Content == "" {
		content.Valid = false
	}
	rowsChanged, err := apiCfg.DB.EditComment(r.Context(), database.EditCommentParams{
		Commentid: commentid,
		Userid: userid,
		Lastmodified: time.Now().In(location),
		Content: content,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Unable to update comment: %v", err))
		return
	}
	if rowsChanged == 0 {
		respondWithJSON(w, http.StatusUnauthorized, fmt.Sprintf("Unable to update comment: %v", err))
		return
	}
	respondWithJSON(w, http.StatusOK, rowsChanged)
}

func (apiCfg *apiConfig) handlerDeleteComment(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Commentid       string
		Userid       string
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Couldn't decode parameters: %v", err))
		return
	}
	commentid := uuid.MustParse(params.Commentid)
	userid := uuid.NullUUID{UUID: uuid.MustParse(params.Userid), Valid: true}
	if params.Userid == "" {
		userid.Valid = false
	}
	rowsChanged, err := apiCfg.DB.DeleteComment(r.Context(), database.DeleteCommentParams{
		Commentid: commentid,
		Userid: userid,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Unable to delete comment: %v", err))
		return
	}
	if rowsChanged == 0 {
		respondWithJSON(w, http.StatusUnauthorized, fmt.Sprintf("Unable to delete comment: %v", err))
		return
	}
	respondWithJSON(w, http.StatusOK, rowsChanged)
}


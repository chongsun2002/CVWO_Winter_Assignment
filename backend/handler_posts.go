package main

import ("net/http"
		"fmt"
		"strconv"
		"github.com/chongsun2002/CVWO_Winter_Assignment/backend/internal/database"
		"database/sql"

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
	
	posts, err := apiCfg.DB.getPosts(r.Context(), database.getPostsParams{
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

package main

import ("net/http"
		"fmt"
		"strconv"
		
		"github.com/chongsun2002/CVWO_Winter_Assignment/backend/internal/database"
)

func (apiCfg *apiConfig) handlerGetPosts(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		offset int
		count int
		topic string
		postid string
	}
	queryParams := r.URL.Query()
	offset, err := strconv.Atoi(queryParams.Get("offset"))
	count, err := strconv.Atoi(queryParams.Get("count"))
	params := parameters{
		offset: offset,
		count: count,
		topic: queryParams.Get("topic"),
		postid: queryParams.Get("postid"),
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

func handlerCreatePost(w http.ResponseWriter, r *http.Request) {

}
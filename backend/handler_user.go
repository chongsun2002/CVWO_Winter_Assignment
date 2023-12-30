package main

import ("net/http"
		"encoding/json"
		"fmt"
		"time"

		"github.com/google/uuid"
)

func (apiCfg *apiConfig) handlerCreateUser(w http.ResponseWriter, r *http.Request){
	type parameters struct {
		Name string
		Password string
	}
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, 400, fmt.Sprintf("Error parsing JSON: ", err))
		return
	}
	apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		UserID: uuid.New(),
		Name: params.Name,
		LastModified: time.Now().In("Asia/Singapore"),
		Password: params.Password,
	})
	respondWithJSON(w, 200, struct{}{})
}

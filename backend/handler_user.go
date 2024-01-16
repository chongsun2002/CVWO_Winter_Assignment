package main

import ("net/http"
		"encoding/json"
		"fmt"
		"time"
		"github.com/chongsun2002/CVWO_Winter_Assignment/backend/internal/database"

		"github.com/google/uuid"
)

func (apiCfg *apiConfig) handlerCreateUser(w http.ResponseWriter, r *http.Request){
	type parameters struct {
		Name string
		Password string
		Email string
	}
	// Decode JSON to Go Struct
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Couldn't decode parameters: %v", err))
		return
	}
	// Format time user was created at
	location, err := time.LoadLocation("Asia/Singapore")
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Internal Server Error getting location: %v", err))
		return
	}
	// Database API
	user, err := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Userid: uuid.New(),
		Name: params.Name,
		Email: params.Email,
		Lastmodified: time.Now().In(location),
		Password: params.Password,
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, fmt.Sprintf("Couldn't create user, error at Database API: %v", err))
		return
	}
	respondWithJSON(w, http.StatusCreated, user)
}

func (apiCfg *apiConfig) handlerChangePassword(w http.ResponseWriter, r *http.Request){
	type parameters struct {
		Name string
		Password string // The old password
		Password_2 string // The new possword
	}
	// Decode JSON
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Couldn't decode parameters: %v", err))
		return
	}
	// Database API

	RowsAffected, err := apiCfg.DB.ChangePassword(r.Context(), database.ChangePasswordParams{
		Name: params.Name,
		Password: params.Password,
		Password_2: params.Password_2,
	})
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Couldn't change password, error at Database API: %v", err))
		return
	}
	if RowsAffected == 0 {
		respondWithJSON(w, http.StatusOK, struct{PasswordChanged string}{PasswordChanged: "Incorrect password, no changes made!"})
		return
	}
	respondWithJSON(w, http.StatusOK, struct{PasswordChanged string}{PasswordChanged: "Password successfully changed!"})
}

func (apiCfg *apiConfig) handlerAuthenticateUser(w http.ResponseWriter, r *http.Request){
	type parameters struct {
		Name string
		Password string // The old password
	}
	// Decode JSON
	decoder := json.NewDecoder(r.Body)
	params := parameters{}
	err := decoder.Decode(&params)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Couldn't decode parameters: %v", err))
		return
	}
	// Database API

	count, err := apiCfg.DB.ChangePassword(r.Context(), database.ChangePasswordParams{
		Name: params.Name,
		Password: params.Password,
	})
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Couldn't change password, error at Database API: %v", err))
		return
	}
	if count == 0 {
		respondWithJSON(w, http.StatusOK, struct{PasswordChanged string}{PasswordChanged: "Unsucessful login, wrong Username or Password"})
		return
	}
	respondWithJSON(w, http.StatusOK, struct{PasswordChanged string}{PasswordChanged: "Successfully Login"})
}
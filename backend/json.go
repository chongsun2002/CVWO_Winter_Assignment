package main

import ("net/http"
		"encoding/json"
		"log")

// This file converts payloads into JSON and errors into JSON

func respondWithJSON(w http.ResponseWriter, statusCode int, payload interface{}) {
	data, err := json.Marshal(payload)
	if err != nil {
		log.Printf("There was an error encoding the following %v to JSON", payload)
		w.WriteHeader(500)
		return
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	w.Write(data)
}

func respondWithError(w http.ResponseWriter, statuscode int, message string) {
	if statuscode > 499 {
		log.Println("Critical server issue:", message)
	}
	type errResponse struct {
		Error string `json:"error"`
	}
	respondWithJSON(w, statuscode, errResponse{Error: message})
}
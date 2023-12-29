package main

import "net/http"

func handler_healthz(w http.ResponseWriter, request *http.Request){
	respondWithJSON(w, 200, struct{}{})
}
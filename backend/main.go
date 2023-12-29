package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main(){
	// Load environment variables and connect to port
	godotenv.Load()
	portString := os.Getenv("PORT")
	if portString == "" {
		log.Fatal("PORT is not found in the dotenv file")
	}
	fmt.Println("Port: ", portString)

	// Set Up Router
	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://*", "http://*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
		ExposedHeaders: []string{"link"},
		AllowCredentials: false,
		MaxAge: 300,
	}))
	
	// Set Up v1 Router to implement versioning - keep site functional while implementing new features

	v1Router := chi.NewRouter()
	v1Router.Get("/healthz", handler_healthz) // Route to check if server is running/health of server
	v1Router.Get("/error", handler_error)

	router.Mount("/v1", v1Router)

	// Set Up Server Configurations
	server := &http.Server{
		Handler: router,
		Addr: ":" + portString,
	}
	log.Printf("Server starting on port %v", portString)

	// Start Server and catch error
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
package main

import (
	"fmt"
	"net/http"

	"cargobay-server/ship"
	"github.com/gorilla/mux"
)

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "CargoBay Server")
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", home).Methods("GET")
	r.HandleFunc("/ship", ship.ShipCargo).Methods("POST")
	fmt.Println("Server is live on localhost:8080")
	http.Handle("/", r)

	http.ListenAndServe(":8080", r)
}

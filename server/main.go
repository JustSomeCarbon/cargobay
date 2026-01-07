package main

import (
	"fmt"
	"net/http"

	"cargobay-server/mulok"
	"cargobay-server/ship"

	"github.com/gorilla/mux"
)

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "CargoBay Server")
}

func main() {
	var ds mulok.DataStore = mulok.InitializeHandler("./upload", 10 << 20, nil)

	// The server middleware upload handler
	var handler = ship.ShipmentHandler{Datastore: ds}

	// Mux router
	r := mux.NewRouter()

	r.HandleFunc("/", home).Methods("GET")
	r.HandleFunc("/ship", handler.ShipCargo).Methods("POST")
	fmt.Println("Server is live on localhost:8080")
	http.Handle("/", r)

	http.ListenAndServe(":8080", r)
}

package ship

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	"cargobay-server/cargo"
	"cargobay-server/mulok"
)

type Cargo = cargo.Cargo

type ShipmentHandler struct {
	Datastore mulok.DataStore
}


func (sh ShipmentHandler) ShipCargo(w http.ResponseWriter, r *http.Request) {

	err := r.ParseMultipartForm(int64(sh.Datastore.MaxSize)) // limit to 10 MB
	if err != nil {
		http.Error(w, "Unable to parse form data", http.StatusBadRequest)
		return
	}

	// retrieve data from form
	shipment, err := extractFile(r)
	if err != nil {
		http.Error(w, "Error Retrieving info from form body", http.StatusInternalServerError)
		return
	}
	defer shipment.ShipFile.Close()

	if sh.Datastore.HandleSingleZipUpload(w, shipment) != nil {
		http.Error(w, "Error unloading file shipment to target store", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "File uploaded successfully: %s", shipment.Manifest.Filename)
}

// takes the request object and extracts the file header and the
// file object itself.
// A new cargo object is created from the
// extrapolated information.
func extractFile(r *http.Request) (Cargo, error) {
	file, handler, err := r.FormFile("shippingFile")
	if err != nil {
		return Cargo{ShipFile: nil, Manifest: nil}, errors.New("No file in form body")
	}
	return Cargo{ShipFile: file, Manifest: handler}, nil
}


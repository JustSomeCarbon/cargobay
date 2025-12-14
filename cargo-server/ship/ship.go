package ship

import (
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
)

type cargo struct {
	shipFile multipart.File
	manifest *multipart.FileHeader
}

func ShipCargo(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(10 << 20) // limit to 10 MB
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
	defer shipment.shipFile.Close()

	dst, err := os.Create(shipment.manifest.Filename)
	if err != nil {
		http.Error(w, "Error creating destination file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	// copy the file to the destination location
	_, err = io.Copy(dst, shipment.shipFile)
	if err != nil {
		http.Error(w, "Error unable to save file", http.StatusInternalServerError)
		return
	}
	fmt.Fprintf(w, "File uploaded successfully: %s", shipment.manifest.Filename)
}


func extractFile(r *http.Request) (cargo, error) {
	// extract file from request body
	file, handler, err := r.FormFile("shippingFile")
	if err != nil {
		return cargo{shipFile: nil, manifest: nil}, errors.New("No file in form body")
	}
	return cargo{shipFile: file, manifest: handler}, nil
}

func unloadCargo(shipment cargo) error {
	return nil
}

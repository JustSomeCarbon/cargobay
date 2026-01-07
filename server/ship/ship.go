package ship

import (
	"errors"
	"fmt"
	"mime/multipart"
	"net/http"
	"strings"

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
	shipment, err := extractShipment(r)
	if err != nil {
		http.Error(w, "Error Retrieving info from form body", http.StatusInternalServerError)
		return
	}

	if err := sh.Datastore.HandleSingleZipUpload(shipment); err != nil {
		fmt.Println(err)
		http.Error(w, "Error unloading file shipment to target store", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "File uploaded successfully: %s", shipment.Manifest.Filename)
}

func extractShipment(r *http.Request) (Cargo, error) {

	form := r.MultipartForm

	parseValue := func(key string) (string, error) {
		valueList := form.Value[key]
		if len(valueList) == 0 {
			return "", errors.New(fmt.Sprintf("%s does not exist", key))
		}
		value := strings.TrimSpace(valueList[0])
		return value, nil
	}

	// extracted target email
	target, err := parseValue("targetEmail") // r.multipartForm.Value["targetEmail"]
	if err != nil {
		return Cargo{}, err
	}
	
	// check that email given are valid

	header, err := extractFile(form)
	if err != nil {
		fmt.Println(err)
		return Cargo{}, err
	}

	return Cargo{TargetEmail: target, Manifest: header}, nil
}

// takes the request object and extracts the file header and the
// file object itself.
// A new cargo object is created from the
// extrapolated information.
func extractFile(form *multipart.Form) (*multipart.FileHeader, error) {
	headers := form.File["shippingFile"]
	if len(headers) == 0 {
		return nil, errors.New("No file in shipping cargo")
	}
	return headers[0], nil
}


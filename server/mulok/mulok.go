// Mulok is a file upload management library built
// to handle file uploads easily.

package mulok

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"cargobay-server/cargo"
)

type Cargo = cargo.Cargo

type fileNameHandler func(uint8) (string, error)

// Handler represents file handling policies
// and procedures when processing and saving files
// from uploads.
type DataStore struct {
	TargetPath string
	MaxSize uint
	FileNameGenerator fileNameHandler
}

/*
  Initializes a datastore for the server.
 */
func InitializeHandler(target string, size uint, fnh fileNameHandler) DataStore {
	if fnh == nil {
		fnh = generateFileName
	}
	// check target exists
	// ensure valid max size
	return DataStore{TargetPath: target, MaxSize: size, FileNameGenerator: fnh}
}

/*
  generates a random filename of the given length.
  the resulting filename always has a zip file extension.
 */
func generateFileName(length uint8) (string, error) {
	buf := make([]byte, length)
	const ext string = ".zip"
	if _, err := rand.Read(buf); err != nil {
		return "", err
	}

	return hex.EncodeToString(buf) + ext, nil
}

/*
  handles the upload functionality of a single 
  zip file provided by the request object, as detailed 
	by the datastore policies.
 */
func (ds DataStore) HandleSingleZipUpload(w http.ResponseWriter, shipment Cargo)  error {
	targetFileName, err := ds.FileNameGenerator(8)
	if err != nil {
		fmt.Printf("")
		return errors.New("")
	}

	// Create destination file at target path 
	dst, err := os.Create(filepath.Join(ds.TargetPath, targetFileName))
	if err != nil {
		http.Error(w, "Error creating destination file", http.StatusInternalServerError)
		return errors.New("Unable to create destination file")
	}
	defer dst.Close()

	// copy file from memory to target file
	if _, err := dst.ReadFrom(shipment.ShipFile); err != nil {
		http.Error(w, "Error unable to save file", http.StatusInternalServerError)
		return errors.New("Unable to save file to destination")
	}
	return nil
}



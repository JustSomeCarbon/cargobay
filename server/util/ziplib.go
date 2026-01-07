package util

import (
	"archive/zip"
	"fmt"
)

func IsValidZip(filename string) (bool, error) {
	r, err := zip.OpenReader(filename)
	if err != nil {
		fmt.Printf("Error: %s", err)
		return false, err
	}
	r.Close()
	return true, nil
}

package cargo

import (
	"mime/multipart"
)

type Cargo struct {
	ShipFile multipart.File
	Manifest *multipart.FileHeader
}

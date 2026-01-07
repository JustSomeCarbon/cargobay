package cargo

import (
	"mime/multipart"
)

type Cargo struct {
	TargetEmail string
	Manifest *multipart.FileHeader
}

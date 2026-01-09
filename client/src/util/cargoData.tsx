
export interface shipment {
  targetEmail: string
  files: File[]
}

export interface processedShipment {
  targetEmail: string
  processedFile: Blob
}

import { BlobReader, BlobWriter, ZipWriter } from "@zip.js/zip.js";
import type { processedShipment, shipment } from "./cargoData";


/**
 * takes the unprocessed shipment and processes the
 * files.
 */
export default async function processFiles(manifest: shipment): Promise<processedShipment> {
  // process file list
  const zipFile = await buildZip(manifest.files);
  return {targetEmail: manifest.targetEmail, processedFile: zipFile};
}

/**
 * Takes a list of files and returns a zip Blob of the files.
 * Caller must handle rejections.
 */
async function buildZip(files: File[]): Promise<Blob> {
  // Create zip writer
  const zipWriter = new ZipWriter(new BlobWriter("application/zip"), { bufferedWrite: true });

  await Promise.all(files.map(async file => {
    return zipWriter.add(file.name, new BlobReader(file));
  }));

  return await zipWriter.close();
}

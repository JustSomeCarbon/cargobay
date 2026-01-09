import type { shipment } from "./cargoData";
import isValidEmail from "./emailValidity";
import processFiles from "./zipBuilder";

// remove for env
const targetAPI = 'http://localhost:8080/ship';

export function ShipOut(manifest: shipment) {
  if (!isValidEmail(manifest.targetEmail)) {
    // email is not valid
    return;
  }
  
  const formData = new FormData();
  
  // process the shipment
  processFiles(manifest).then(shipment => {
    formData.append("targetEmail", shipment.targetEmail);
    formData.append("shippingFile", shipment.processedFile, "shipment.zip");
  }).catch(err => {
    console.error(err);
  });

  // send data to server api
  fetch(targetAPI, {
    method: "POST",
    body: formData
  }).catch(err => {
    console.error(err);
  })
}

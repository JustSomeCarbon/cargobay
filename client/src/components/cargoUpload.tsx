import { useState } from "react";
import { ShipOut } from "../util/ShipOut";
import FileInput from "../ui/FileInput";
import Input from "../ui/Input";
import type { shipment } from "../util/cargoData";

export default function CargoUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [target, setTarget] = useState("");

  const handleFileChange = (files: FileList) => {
    setFiles(Array.from(files));
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 border border-{black} p-10 rounded-lg">
      <div className='flex items-center gap-4'>
        <p className="font-semibold text-m">
          Target Email:
        </p>
        <Input updateEmail={setTarget} email={target} />
      </div>

      <div className="items-center gap-3">
        <FileInput updateFileList={handleFileChange} />
        <button
          className="inline-flex items-center justify-center border border-gray-300 rounded px-2 my-3 cursor-pointer hover:bg-blue-50"
          onClick={() => {
            const cargo: shipment = {targetEmail: target, files};
            ShipOut(cargo)
          }}
        >
          Ship Out
        </button>
      </div>

    </div>
  );
}

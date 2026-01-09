import { useState } from "react";
import { ShipOut } from "../util/ShipOut";
import FileInput from "../ui/FileInput";
import Input from "../ui/Input";

export default function CargoUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [target, setTarget] = useState("");

  const handleFileChange = (files: FileList) => {
    setFiles(Array.from(files));
  }

  return (
    <div className="cargoUpload">
      <div className="manifestLabel">
        <Input updateEmail={setTarget} email={target} />
      </div>

      <div className="fileSelection">
        <FileInput updateFileList={handleFileChange} />
        <button
          onClick={() => ShipOut(files)}
        >
          Ship Out
        </button>
      </div>

    </div>
  );
}

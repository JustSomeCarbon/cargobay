import { useState } from "react";
import Input from "../ui/Input";

export default function CargoUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (files: FileList) => {
    setFiles(Array.from(files));
  }

  return (
    <div>
      <Input updateFileList={handleFileChange} />
      <button
        value="Ship Out"
      >
      </button>
    </div>
  );
}

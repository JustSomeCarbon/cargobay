import FileInput from "../ui/FileInput";
import FileList from "../ui/FileList";

type handleChange = (files : File[]) => void;

export default function FileArea({ onChange, files } : {onChange : handleChange, files: File[]}) {
  
  const handleFileDelete = (deletedFile: File) => {
    const newFileList = files.filter(file => file.name !== deletedFile.name);
    onChange(newFileList);
  }

  return (
    <div>
      <FileInput updateFileList={onChange} />
      <FileList list={files} onDelete={handleFileDelete} />
    </div>
  );
}

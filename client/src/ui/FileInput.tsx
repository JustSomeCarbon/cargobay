
type UpdateFileList = (files: FileList) => void;

export default function FileInput({ updateFileList }: { updateFileList: UpdateFileList }) {
  return (
    <div>
      <input type="file"
        onChange={(e) => {
          if (e.target.files) {
            updateFileList(e.target.files);
          }
        }} multiple />
    </div>
  );
}

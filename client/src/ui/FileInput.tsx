
type UpdateFileList = (files: File[]) => void;

export default function FileInput({ updateFileList }: { updateFileList: UpdateFileList }) {
  return (
    <div>
      <label
        className="inline-flex items-center justify-center font-medium rounded-md border border-gray-300 bg-white px-1 py-1 cursor-pointer hover:bg-gray-100"
        htmlFor="files"
      >
        Select Files
      </label>

      <input 
        id="files"
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            updateFileList(Array.from(e.target.files));
          }
        }}
        multiple
        className="hidden"
      />
    </div>
  );
}

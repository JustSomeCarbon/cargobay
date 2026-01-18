import { X } from "lucide-react";

type deleteFile = (file: File) => void;

export default function FileObject({ file, onDelete } : {file: File, onDelete: deleteFile}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded border px-3 py-2 bg-white shadow-sm">
      <div className="truncate text-sm">
        {file.name}
      </div>
      <div>
        <button
          type="button"
          onClick={() => onDelete(file)}
          className="p-1 rounded-xl hover:bg-red-400 text-red-900 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import FileObject from "./FileObject";

type handleDelete = (file: File) => void;

export default function FileList({ list, onDelete } : {list: File[], onDelete: handleDelete}) {

  return (
    <div>
      {list.map(file => {
        return <FileObject file={file} onDelete={onDelete} />
      })}
    </div>
  );
}

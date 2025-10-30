//import axios from "axios";
import React, { useState } from "react";
//import axios from 'axios';
//import 'ship.module.css';

function ShipPage() {
  var [fileList, setFileList] = useState<FileList | null>();

  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files && e.target.files.length > 0 ? e.target.files : null);
  }

  const shipFiles = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(fileList);
    setFileList(null);
  };

  return (
    <>
    <div className='uploadFormContainer'>
      <form className='uploadForm' onSubmit={shipFiles}>
        <input name='fileUploadList' type='file' accept=".txt,image/*" onChange={onChangeFiles} multiple />
        <button type='submit' disabled={!fileList}>ship</button>
      </form>
    </div>
    </>
  );
}

export default ShipPage;

//import axios from "axios";
import { useState } from "react";
import 'ship.module.css';

function Ship() {
  var [fileList, setFileList] = useState<FileList | null>();

  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files && e.target.files.length > 0 ? e.target.files : null);
  }

  const shipFiles = () => {
    console.log(fileList);
    setFileList(null);
  };

  return (
    <>
    <div className='uploadFormContainer'>
      <form className='uploadForm' onSubmit={shipFiles}>
        <input name='fileList' type='file' accept=".txt,image/*" onChange={onChangeFiles} multiple />
        <button type='submit' disabled={!fileList}>ship</button>
      </form>
    </div>
    </>
  );
}

export default Ship;

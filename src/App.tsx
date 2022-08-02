// ./src/App.tsx

import React, { useState } from 'react';
import uploadDataToBlob, { isStorageConfigured } from './azure-storage-blob';

const storageConfigured = isStorageConfigured();
const tracklog = JSON.parse('{"data": "xxx","start_date": "xxx","end_date": "xxx","timestamp": ""}');

const App = (): JSX.Element => {

  console.log(tracklog)

  const [uploading, setUploading] = useState(false);

  const onFileUpload = async () => {
    // prepare UI
    var currentTimestamp = new Date().toLocaleString()
    tracklog["timestamp"] = currentTimestamp;
    var result = JSON.stringify(tracklog)
    setUploading(true);

    uploadDataToBlob(result);
  };

  // display form
  const DisplayForm = () => (
    <div>
      <button type="submit" onClick={onFileUpload}>
        Upload!
          </button>
    </div>
  )

  return (
    <div>
      <h1>Upload file to Azure Blob Storage</h1>
      {storageConfigured && !uploading && DisplayForm()}
      {storageConfigured && uploading && <div>Uploading</div>}
      <hr />
      {storageConfigured}
      {!storageConfigured && <div>Storage is not configured.</div>}
    </div>
  );
};

export default App;
// ./src/azure-storage-blob.ts

import { BlobServiceClient} from '@azure/storage-blob';

const containerName =  "test";
const blobName = "test_"+ new Date().getTime() + ".json";
const sasToken = process.env.REACT_APP_STORAGESASTOKEN;
const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME; 

export const isStorageConfigured = () => {
  return (!storageAccountName || !sasToken) ? false : true;
}
const blobServiceClient = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net?${sasToken}`);
    
    
async function uploadDataToBlob(data: string) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}

export default uploadDataToBlob;


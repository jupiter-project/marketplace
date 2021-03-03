
import { memo, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import UploadArea from './UploadArea'
import UploadFileItem from './UploadFileItem'
import { isEmpty } from 'utils/helpers/utility'

const UploadMedia = ({
  file,
  fileBuffer,
  setFile,
  setFileBuffer
}) => {

  const deleteFileHandler = useCallback(() => {
    setFile(null)
    setFileBuffer(null)
  }, [setFile, setFileBuffer]);

  const onDrop = async (acceptedFiles) => {
    if (!Array.isArray(acceptedFiles) || acceptedFiles.length <= 0) return;
    const file = acceptedFiles[0];
    setFile(file)
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setFileBuffer(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' })

  return (
    isEmpty(file)
      ? (
        <UploadArea
          isDragActive={isDragActive}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
        />
      ) : (
        <UploadFileItem
          fileBuffer={fileBuffer}
          onDelete={deleteFileHandler}
        />
      )
  );
}

export default memo(UploadMedia)
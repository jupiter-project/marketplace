
import { memo, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import UploadArea from './UploadArea'
import UploadFileItem from './UploadFileItem'
import { isEmpty } from 'utils/helpers/utility'
import { MAX_UPLOAD_SIZE } from 'utils/constants/common'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'

const UploadMedia = ({
  fileBuffer,
  setFileBuffer
}) => {
  const { setPopUp } = usePopUp();

  const deleteFileHandler = useCallback(() => {
    setFileBuffer(null)
  }, [setFileBuffer]);

  const onDrop = async (acceptedFiles) => {
    if (!Array.isArray(acceptedFiles) || acceptedFiles.length <= 0) {
      setPopUp({ text: MESSAGES.MAX_UPLOAD_ERROR })
      return;
    }

    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setFileBuffer(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: MAX_UPLOAD_SIZE
  })

  return (
    isEmpty(fileBuffer)
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
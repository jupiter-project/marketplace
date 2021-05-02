
import { memo, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import { MAX_UPLOAD_SIZE } from 'utils/constants/common'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    padding: theme.spacing(1),
    borderRadius: 2,
    border: `1px solid ${theme.custom.palette.border}`,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    padding: theme.spacing(3),
    backgroundColor: theme.custom.palette.grey
  },
}));

const UploadMedia = ({
  type,
  setFileBuffer
}) => {
  const classes = useStyles();
  const { setPopUp } = usePopUp();

  const onDrop = useCallback(async (acceptedFiles) => {
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
  }, [setPopUp, setFileBuffer]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: type.ACCEPT,
    maxSize: MAX_UPLOAD_SIZE
  })

  return (
    <div className={classes.root}>
      <div {...getRootProps()} className={classes.container} >
        <input {...getInputProps()} />
        <Typography
          variant='h6'
          color='textSecondary'
          align='center'
        >
          {type.PLACEHOLDER}
        </Typography>
        <ContainedButton>
          Choose file
        </ContainedButton>
      </div>
    </div>
  );
}

export default memo(UploadMedia)
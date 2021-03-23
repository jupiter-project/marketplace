
import { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined'
import clsx from 'clsx'

import GradientButton from 'components/UI/Buttons/GradientButton'

const useStyles = makeStyles((theme) => ({
  upload: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    height: '100%',
    borderRadius: 20,
    border: `2px dotted ${theme.palette.primary.main}`,
    '&:focus': {
      outline: '0 !important'
    }
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50
  },
  uploadIcon: {
    width: 40,
    height: 40,
    transition: 'width 0.5s, height 0.5s',
    color: theme.palette.primary.main
  },
  dragActiveIcon: {
    width: 50,
    height: 50
  }
}));

const UploadArea = ({
  isDragActive,
  getRootProps,
  getInputProps
}) => {
  const classes = useStyles();

  return (
    <div
      {...getRootProps()}
      className={classes.upload}
    >
      <input {...getInputProps()} />
      <Typography variant='h6' color='textSecondary' align='center'>
        PNG, GIF, WEBP. Max 50MB.
      </Typography>
      <div className={classes.iconContainer}>
        <CloudUploadIcon className={clsx(classes.uploadIcon, { [classes.dragActiveIcon]: isDragActive })} />
      </div>
      <GradientButton>
        Choose file
      </GradientButton>
    </div>
  );
}

export default memo(UploadArea)
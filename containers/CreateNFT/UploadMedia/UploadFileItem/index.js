
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles((theme) => ({
  fileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: theme.spacing(4),
    borderRadius: 20,
    height: '100%',
    border: `2px dotted ${theme.palette.primary.main}`,
  },
  image: {
    width: '100%',
    height: 220,
    objectFit: 'contain'
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    border: `1px solid ${theme.custom.palette.border}`
  }
}));

const UploadFileItem = ({
  fileBuffer,
  onDelete
}) => {
  const classes = useStyles();

  return (
    <div className={classes.fileContainer}>
      <img
        src={fileBuffer || IMAGE_PLACEHOLDER_IMAGE_PATH}
        className={classes.image}
      />
      <IconButton
        className={classes.deleteIcon}
        onClick={onDelete}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}

export default memo(UploadFileItem)
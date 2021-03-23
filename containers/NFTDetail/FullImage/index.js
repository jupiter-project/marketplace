
import { memo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogContent,
  IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: `${theme.spacing(5)} !important`,
    backgroundColor: theme.custom.palette.white
  },
  closeIcon: {
    position: 'absolute',
    top: 24,
    right: 24,
    border: `1px solid ${theme.palette.text.secondary}`,
  },
  image: {
    objectFit: 'contain',
    borderRadius: 16,
    height: '70vh',
    maxWidth: '100%',
    border: `4px solid ${theme.palette.primary.main}`,
  }
}));

const FullImage = ({
  good,
  open,
  setOpen,
}) => {
  const classes = useStyles();

  const closeHandler = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <Dialog fullScreen open={open} onClose={closeHandler}>
      <DialogContent className={classes.root}>
        <IconButton
          onClick={closeHandler}
          aria-label="close"
          className={classes.closeIcon}
        >
          <CloseIcon />
        </IconButton>
        <img
          src={good.description || IMAGE_PLACEHOLDER_IMAGE_PATH}
          alt='good production'
          className={classes.image}
        />
      </DialogContent>
    </Dialog>
  );
}

export default memo(FullImage);

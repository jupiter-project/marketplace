
import { memo, useCallback } from 'react'
import { Typography } from '@material-ui/core'

import MagicDialog from 'components/MagicDialog'

const MagicConfirmDialog = ({
  open,
  setOpen,
  description = 'Are you sure to proceed this operation?',
  onConfirm
}) => {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const confirmHandler = useCallback(() => {
    setOpen(false);
    onConfirm();
  }, [setOpen, onConfirm]);

  return (
    <MagicDialog
      open={open}
      title='Confirm'
      cancelLabel='Cancel'
      confirmLabel='Confirm'
      onCancel={handleClose}
      onClose={handleClose}
      onConfirm={confirmHandler}
    >
      <Typography align='center'>
        {description}
      </Typography>
    </MagicDialog>
  );
}

export default memo(MagicConfirmDialog)
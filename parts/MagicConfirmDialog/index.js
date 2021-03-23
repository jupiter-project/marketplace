
import { memo } from 'react'
import { Typography } from '@material-ui/core'

import MagicDialog from 'components/MagicDialog'

const MagicConfirmDialog = ({
  text = 'Are you sure to proceed this operation?',
  ...rest
}) => {
  return (
    <MagicDialog {...rest}>
      <Typography color='primary' variant='h5' align='center'>
        {text}
      </Typography>
    </MagicDialog>
  );
}

export default memo(MagicConfirmDialog)
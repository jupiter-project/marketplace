
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

import MagicTextField from 'components/UI/MagicTextField'

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    color: theme.custom.palette.red
  }
}));

const MagicSearchInput = ({
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MagicTextField
      startAdornment={<SearchIcon className={classes.searchIcon} />}
      {...rest}
    />
  )
}

export default memo(MagicSearchInput)
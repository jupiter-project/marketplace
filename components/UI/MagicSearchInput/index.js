
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

import MagicTextField from 'components/UI/TextFields/MagicTextField'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320
  },
  searchIcon: {
    color: theme.palette.primary.main
  }
}));

const MagicSearchInput = ({
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MagicTextField
      className={classes.root}
      startAdornment={
        <SearchIcon className={classes.searchIcon} />
      }
      {...rest}
    />
  )
}

export default memo(MagicSearchInput)
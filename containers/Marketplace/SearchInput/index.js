
import { memo, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import MagicSearchInput from 'components/UI/MagicSearchInput'
import ContainedButton from 'components/UI/Buttons/ContainedButton'

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0)
  },
  button: {
    marginLeft: theme.spacing(1)
  }
}));

const SearchInput = ({
  onSearch
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  const searchHandler = useCallback(() => {
    onSearch(query)
  }, [query, onSearch]);

  return (
    <div className={classes.searchContainer}>
      <MagicSearchInput
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <ContainedButton
        className={classes.button}
        onClick={searchHandler}
      >
        Search
      </ContainedButton>
    </div>
  )
}

export default memo(SearchInput);
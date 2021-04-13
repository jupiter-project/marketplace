
import { memo, useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import FilterIcon from '@material-ui/icons/FilterList'

import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2, 1)
  },
  filerIcon: {
    fontSize: 20,
    marginTop: -theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  selectedTag: {
    fontSize: 14,
    margin: theme.spacing(0.5)
  },
  closeIcon: {
    fontSize: 18,
    marginLeft: theme.spacing(0.5)
  },
  defaultTag: {
    padding: theme.spacing(0.5, 1),
    textDecoration: 'underline',
    textTransform: 'capitalize',
    cursor: 'pointer',
    fontSize: 16
  },
  clearAll: {
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: theme.spacing(1),
    color: theme.custom.palette.red
  },
  closeFilter: {
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: theme.spacing(1),
    color: theme.palette.primary.main
  }
}));

const TagsFilter = ({
  onTags,
}) => {
  const router = useRouter();
  const classes = useStyles();

  const [show, setShow] = useState(false);
  const [allTags, setAllTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    getAllTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!!router.query?.tag && !isEmpty(allTags)) {
      const tag = allTags.find((item) => item.tag === router.query?.tag);
      setSelectedTags([tag])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTags])

  useEffect(() => {
    onTags(selectedTags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags])

  const getAllTags = useCallback(async () => {
    const { tags } = await jupiterAPI.getAllTags();
    setAllTags(tags)
  }, [setAllTags])

  const deselectTagHandler = useCallback((value) => () => {
    const currentIndex = selectedTags.findIndex((item) => item.tag === value.tag);
    const newSelectedTags = [...selectedTags];

    if (currentIndex > -1) {
      newSelectedTags.splice(currentIndex, 1);
    }
    setSelectedTags(newSelectedTags)
  }, [selectedTags, setSelectedTags])

  const selectTagHandler = useCallback((item) => () => {
    setSelectedTags(prev => [...prev, item])
  }, [setSelectedTags])

  const clearAllHandler = useCallback(() => {
    setSelectedTags([])
  }, [setSelectedTags])

  return (
    show
      ? !isEmpty(allTags) &&
      <Paper className={classes.filterContainer}>
        <div className={classes.tagList}>
          {selectedTags.map((item) => (
            <ContainedButton
              key={item.tag}
              className={classes.selectedTag}
              onClick={deselectTagHandler(item)}
            >
              {item.tag}
              <CloseIcon
                className={classes.closeIcon}
              />
            </ContainedButton>
          ))}
        </div>
        <div className={classes.tagList}>
          {allTags.filter((item) => !selectedTags.includes(item))
            .map((item) => (
              <Typography
                key={item.tag}
                color='primary'
                className={classes.defaultTag}
                onClick={selectTagHandler(item)}
              >
                {item.tag}
              </Typography>
            ))
          }
        </div>
        <div className={classes.tagList}>
          <Typography
            className={classes.clearAll}
            onClick={clearAllHandler}
          >
            Clear Filter
          </Typography>
          <Typography
            className={classes.closeFilter}
            onClick={() => setShow(false)}
          >
            Close Filter
          </Typography>
        </div>
      </Paper>
      : (
        <ContainedButton onClick={() => setShow(true)} >
          <FilterIcon className={classes.filerIcon} />
          Filter
        </ContainedButton>
      )
  )
}

export default memo(TagsFilter);
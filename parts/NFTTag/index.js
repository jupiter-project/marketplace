import { memo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  tag: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor: 'pointer',
    color: theme.custom.palette.white,
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.custom.palette.black})`,
    padding: theme.spacing(1, 2.5, 0.5),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 20,
    boxShadow: '0 2px 12px 0 #bdbdbd',
  },
}));

const NFTTag = ({
  tag
}) => {
  const classes = useStyles();
  const router = useRouter();

  const tagHandler = useCallback(() => {
    router.push({
      pathname: LINKS.MARKETPLACE.HREF,
      query: { tag }
    });
  }, [tag, router])

  return (
    <Typography
      className={classes.tag}
      onClick={tagHandler}
    >
      {tag}
    </Typography>
  )
}

export default memo(NFTTag)
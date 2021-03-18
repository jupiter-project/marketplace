import { memo } from 'react'
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
    padding: theme.spacing(0.5, 2.5),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 30,
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const NFTTag = ({
  tag
}) => {
  const classes = useStyles();
  const router = useRouter();

  const tagHandler = () => {
    router.push(LINKS.MARKETPLACE.HREF)
  }

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
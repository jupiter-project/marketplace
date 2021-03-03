
import { memo } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import StarIcon from '@material-ui/icons/Star'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(6, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(3, 0),
    }
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 'initial',
    marginBottom: theme.spacing(4),
    borderBottom: `5px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down('xs')]: {
      fontSize: 40
    }
  },
  descriptionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    fontSize: 45,
    textTransform: 'uppercase',
    margin: theme.spacing(0, 4),
    [theme.breakpoints.down('xs')]: {
      fontSize: 30
    }
  },
  star: {
    width: 40,
    height: 40,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      width: 30,
      height: 30,
    }
  }
}));

const HomeImageWall = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Typography
          variant='h1'
          color='primary'
          className={classes.title}
          align='center'
        >
          Jupiter NFT Token
        </Typography>
        <div className={classes.descriptionContainer}>
          <StarIcon className={classes.star} />
          <Typography
            color='textPrimary'
            className={classes.description}
          >
            Demo Site
          </Typography>
          <StarIcon className={classes.star} />
        </div>
      </div>
    </main>
  )
}

export default memo(HomeImageWall)
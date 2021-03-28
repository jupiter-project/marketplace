
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography
} from '@material-ui/core'
import CodeIcon from '@material-ui/icons/Code'
import BoltIcon from '@material-ui/icons/OfflineBolt'
import HeadPhoneIcon from '@material-ui/icons/Headset'
import CheckIcon from '@material-ui/icons/Check'
import BarIcon from '@material-ui/icons/ViewWeek'
import UnLockIcon from '@material-ui/icons/LockOpen'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import HomeIcon from '@material-ui/icons/DonutSmall'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: theme.spacing(8, 3)
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 1020,
    width: '100%'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(8),
    maxWidth: 380,
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
      marginBottom: theme.spacing(5),
    },
  },
  list: {
    width: '100%',
    padding: theme.spacing(2)
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2)
  },
  square: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 15,
    opacity: 0.2,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
    },
  }
}));

const CreatorAndCollector = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Typography variant='h1' className={classes.title}>
          Categories and Tags
        </Typography>
        <Grid container spacing={8} className={classes.list}>
          {
            CREATORS.map((item, index) => (
              <Grid key={index} item xs={6} md={3} className={classes.item}>
                <div className={classes.iconContainer}>
                  <div className={classes.square} style={{ backgroundColor: item.color }} />
                  <item.icon style={{ color: item.color, width: 30, height: 30 }} />
                </div>
                <Typography className={classes.text}>
                  {item.title}
                </Typography>
                <Typography className={classes.text} style={{ color: item.color }}>
                  {item.description}
                </Typography>
              </Grid>
            ))
          }
        </Grid>
      </div>
    </section>
  );
};

export default memo(CreatorAndCollector);

const CREATORS = [
  {
    title: 'No code',
    description: 'Required',
    color: '#5dc1a3',
    icon: CodeIcon
  },
  {
    title: 'Community',
    description: 'Driven',
    color: '#7672f6',
    icon: BoltIcon
  },
  {
    title: 'Flexible',
    description: 'Royalties',
    color: '#ec5f67',
    icon: HeadPhoneIcon
  },
  {
    title: 'Verified',
    description: 'Creators',
    color: '#f3be42',
    icon: CheckIcon
  },
  {
    title: 'Multiple',
    description: 'Minting',
    color: '#ef8532',
    icon: BarIcon
  },
  {
    title: 'Unlockable',
    description: 'Items',
    color: '#4ca9ef',
    icon: UnLockIcon
  },
  {
    title: 'Auction',
    description: 'Functions',
    color: '#bd00ff',
    icon: ShowChartIcon
  },
  {
    title: 'Leda',
    description: 'Rewards',
    color: '#0066ff',
    icon: HomeIcon
  },
]
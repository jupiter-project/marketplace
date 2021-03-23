import { memo } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Avatar,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1.5),
    borderRadius: 10,
  },
  content: {
    height: 205
  },
  description: {
    fontSize: 18
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2)
  },
  name: {
    fontWeight: 'bold'
  }
}));

const FeedbackCard = ({
  item
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label={item.name} src={item?.avatar || ''} />
        }
      />
      <CardContent className={classes.content}>
        <Typography
          variant='body1'
          color='textSecondary'
          className={classes.description}
        >
          {item.description}
        </Typography>
      </CardContent>
      <CardActionArea className={classes.action}>
        <Typography
          variant='h6'
          color='textPrimary'
          className={classes.name}
        >
          {item.name}
        </Typography>
        <Typography
          variant='h6'
          color='textSecondary'
        >
          {item.subName}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default memo(FeedbackCard)
import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Tooltip
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import LinkButton from 'components/UI/Buttons/LinkButton';
import CardDropMenu from './CardDropMenu';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '80%'
  },
  highestBid: {
    display: 'flex',
    alignItems: 'center'
  },
  highestButton: {
    marginLeft: theme.spacing(1)
  },
  name: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5)
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const NFTCard = ({
  item
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <AvatarGroup>
            <Tooltip title='Collection' aria-label='Collection'>
              <Avatar alt={item.collection.name} src={item.collection.avatar} />
            </Tooltip>

            <Tooltip title='Owner' aria-label='Owner'>
              <Avatar alt={item.owner.name} src={item.owner.avatar} />
            </Tooltip>

            <Tooltip title='Creator' aria-label='Creator'>
              <Avatar alt={item.creator.name} src={item.creator.avatar} />
            </Tooltip>
          </AvatarGroup>
        }
        action={<CardDropMenu />}
      />

      <CardMedia
        className={classes.media}
        image={item.product}
        title={item.name}
      />

      <CardContent>
        <Typography variant='body1' color='textPrimary' className={classes.name}>
          {item.name}
        </Typography>
        <Typography variant='body1' color='textPrimary' className={classes.name}>
          {item.price} JUP
        </Typography>

        {
          !!item.highestBid
            ? (
              <Typography variant='body2' color='textSecondary' className={classes.highestBid} component='div'>
                highestBid
                <LinkButton className={classes.highestButton}>
                  {item.highestBid} JUP
                </LinkButton>
              </Typography>
            ) : (
              <LinkButton>
                Place a bid
              </LinkButton>
            )
        }
      </CardContent>
    </Card>
  );
}

export default memo(NFTCard)
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
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';

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

const collection = {
  avatar: 'https://images.unsplash.com/photo-1604893802731-d290d2e1afe1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGp1cGl0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  name: 'Jupiter'
}

const PreviewCard = ({
  item,
  image
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <AvatarGroup>
            <Tooltip title='Collection' aria-label='Collection'>
              <Avatar alt={collection.name} src={collection.avatar} />
            </Tooltip>
          </AvatarGroup>
        }
      />

      <CardMedia
        className={classes.media}
        image={image || IMAGE_PLACEHOLDER_IMAGE_PATH}
      />

      <CardContent>
        {
          !!item?.name &&
          <Typography variant='body1' color='textPrimary' className={classes.name}>
            {item?.name}
          </Typography>
        }

        {
          !!item?.price &&
          <Typography variant='body1' color='textPrimary' className={classes.name}>
            {item?.price} ETH
          </Typography>
        }

        {
          !!item?.highestBid
            ? (
              <Typography variant='body2' color='textSecondary' className={classes.highestBid} component='div'>
                highestBid
                <LinkButton className={classes.highestButton}>
                  {item?.highestBid} WETH
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

export default memo(PreviewCard)
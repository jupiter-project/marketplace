import { memo } from 'react';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import LinkButton from 'components/UI/Buttons/LinkButton';
import MagicIdenticon from 'components/MagicIdenticon'
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

const PreviewCard = ({
  item,
  image
}) => {
  const classes = useStyles();
  const { accountRS } = useSelector(state => state.auth);

  return (
    <Card>
      <CardHeader
        avatar={
          <MagicIdenticon value={accountRS} />
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
            {item?.price} JUP
          </Typography>
        }

        {
          !!item?.highestBid
            ? (
              <Typography variant='body2' color='textSecondary' className={classes.highestBid} component='div'>
                highestBid
                <LinkButton className={classes.highestButton}>
                  {item?.highestBid} JUP
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
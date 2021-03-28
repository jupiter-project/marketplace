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

import MagicIdenticon from 'components/MagicIdenticon'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '80%',
    cursor: 'pointer',
    position: 'relative'
  },
  quantityContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    minWidth: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 2px 12px 0 ${theme.palette.primary.main}`,
  },
  quantity: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.custom.palette.white,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: theme.spacing(0.5)
  },
  price: {
    fontWeight: 'bold',
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
      >
        {item.quantity &&
          <div className={classes.quantityContainer}>
            <Typography
              variant='body2'
              className={classes.quantity}
            >
              {item.quantity}
            </Typography>
          </div>
        }
      </CardMedia>

      <CardContent>
        {!!item?.name &&
          <Typography
            variant='body1'
            color='textPrimary'
            className={classes.name}
          >
            {item?.name}
          </Typography>
        }
        {!!item?.price &&
          <Typography
            variant='body2'
            color='primary'
            className={classes.price}
          >
            {item?.price} JUP
          </Typography>
        }
      </CardContent>
    </Card>
  );
}

export default memo(PreviewCard)
import { memo } from 'react';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';

import MagicIdenticon from 'components/MagicIdenticon'
import { FILE_TYPES } from 'utils/constants/file-types';
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    position: 'relative',
    margin: -theme.spacing(2),
    marginBottom: 0,
    height: 180,
  },
  image: {
    height: 180,
    width: '100%',
    objectFit: 'cover'
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
}));

const PreviewCard = ({
  type,
  item,
  fileBuffer
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
      <CardContent>
        <div className={classes.imageContainer}>
          {type === FILE_TYPES.IMAGE.VALUE
            ? (
              <img
                alt='image'
                src={fileBuffer || IMAGE_PLACEHOLDER_IMAGE_PATH}
                className={classes.image}
              />
            ) : fileBuffer && (
              <video autoPlay loop controls className={classes.image}>
                <source src={fileBuffer} />
              </video>
            )
          }
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
        </div>
        {!!item?.name &&
          <Typography
            variant='body1'
            color='textPrimary'
            className={classes.name}
          >
            {item?.name}
          </Typography>
        }
      </CardContent>
    </Card>
  );
}

export default memo(PreviewCard)
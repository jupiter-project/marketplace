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
    objectFit: 'contain'
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
              <video muted autoPlay loop controls className={classes.image}>
                <source src={fileBuffer} />
              </video>
            )
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
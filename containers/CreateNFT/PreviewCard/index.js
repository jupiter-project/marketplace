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
    paddingTop: '80%'
  },
  name: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5)
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
      </CardContent>
    </Card>
  );
}

export default memo(PreviewCard)
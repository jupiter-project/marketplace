import { memo, useMemo } from 'react'
import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths'
import { FILE_TYPES } from 'utils/constants/file-types'
import getJSONParse from 'utils/helpers/getJSONParse'

const useStyles = makeStyles((theme) => ({
  container: {
    height: 320,
    position: 'relative',
    margin: theme.spacing(2),
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 4,
  },
  content: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    bottom: 0
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: theme.spacing(1),
    color: theme.custom.palette.white
  },
}));

const NFTCarouselItem = ({
  item
}) => {
  const classes = useStyles();
  const info = useMemo(() => getJSONParse(item?.message), [item]);

  return (
    <Card className={classes.container}>
      {info?.type === FILE_TYPES.VIDEO.VALUE
        ? (
          <video autoPlay loop controls className={classes.image}>
            <source src={info?.image} />
          </video>
        ) : (
          <img
            alt='carousel'
            src={info?.image || IMAGE_PLACEHOLDER_IMAGE_PATH}
            className={classes.image}
          />
        )
      }
      <div className={classes.content}>
        <Typography className={classes.title}>
          {item.description}
        </Typography>
      </div>
    </Card>
  );
};

export default memo(NFTCarouselItem);
import { memo, useMemo } from 'react'
import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ProductContent from 'parts/ProductContent'
import getJSONParse from 'utils/helpers/getJSONParse'
import { useCommonStyles } from 'styles/use-styles'
import clsx from 'clsx'

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
    bottom: 0,
    padding: theme.spacing(2)
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: theme.spacing(1),
    color: theme.custom.palette.white
  },
  description: {
    lineHeight: 1,
    WebkitLineClamp: 3,
    textAlign: 'center',
    color: theme.custom.palette.white
  }
}));

const NFTCarouselItem = ({
  item,
  onDetail
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles()

  const info = useMemo(() => getJSONParse(item?.message), [item]);

  return (
    <Card className={classes.container} onClick={() => onDetail(item)}>
      <ProductContent
        info={info}
        className={classes.image}
      />
      <div className={classes.content}>
        <Typography className={classes.title}>
          {item.description}
        </Typography>
        <Typography className={clsx(classes.description, commonClasses.breakWords)}>
          {info.description}
        </Typography>
      </div>
    </Card>
  );
};

export default memo(NFTCarouselItem);
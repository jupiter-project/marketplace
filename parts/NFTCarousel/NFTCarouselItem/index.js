import { memo, useMemo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ProductContent from 'parts/ProductContent'
import getJSONParse from 'utils/helpers/getJSONParse'
import { useCommonStyles } from 'styles/use-styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  container: {
    height: 420,
    margin: theme.spacing(2),
  },
  imageContainer: {
    width: '100%',
    padding: theme.spacing(1),
    borderRadius: 2,
    border: `1px solid ${theme.palette.text.primary}`,
    marginBottom: theme.spacing(1)
  },
  image: {
    height: 320,
    width: '100%',
    objectFit: 'contain',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    padding: theme.spacing(1, 0)
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: theme.spacing(1),
  },
  description: {
    lineHeight: 1,
    WebkitLineClamp: 2,
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
    <div className={classes.container} onClick={() => onDetail(item)}>
      <div className={classes.imageContainer}>
        <ProductContent
          info={info}
          className={classes.image}
        />
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>
          {item.description}
        </Typography>
        <Typography className={clsx(classes.description, commonClasses.breakWords)}>
          {info.description}
        </Typography>
      </div>
    </div>
  );
};

export default memo(NFTCarouselItem);

import { memo, useMemo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';
import { FILE_TYPES } from 'utils/constants/file-types'
import getJSONParse from 'utils/helpers/getJSONParse'

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  info: {
    marginLeft: theme.spacing(2)
  },
  name: {
    fontWeight: 'bold',
  },
  image: {
    width: 90,
    height: 90,
    objectFit: 'cover',
    borderRadius: 8,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  sell: {
    fontSize: 15,
    padding: theme.spacing(1, 1, 0.5),
  }
}));

const AssetItem = ({
  item,
  onSell
}) => {
  const classes = useStyles();

  const info = useMemo(() => getJSONParse(item?.message), [item]);

  return (
    <div className={classes.itemContainer}>
      <div className={classes.content}>
        {info?.type === FILE_TYPES.VIDEO.VALUE
          ? (
            <video autoPlay loop controls className={classes.image}>
              <source src={info?.image} />
            </video>
          ) : (
            <img
              alt='image'
              src={info?.image || IMAGE_PLACEHOLDER_IMAGE_PATH}
              className={classes.image}
            />
          )
        }
        <div className={classes.info}>
          <Typography
            variant='h6'
            color='textPrimary'
            className={classes.name}
          >
            {item.description}
          </Typography>
          <Typography color='textSecondary'>
            {info?.description || ''}
          </Typography>
          <Typography color='primary'>
            Quantity: {item?.quantityQNT || 0}
          </Typography>
        </div>
      </div>
      <ContainedButton
        className={classes.sell}
        onClick={() => onSell(item)}
      >
        Sell
      </ContainedButton>
    </div>
  )
}

export default memo(AssetItem)

import { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import { NQT_WEIGHT } from 'utils/constants/common'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  image: {
    width: 90,
    height: 90,
    objectFit: 'cover',
    borderRadius: 8,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  info: {
    marginLeft: theme.spacing(2)
  },
  name: {
    fontWeight: 'bold',
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'wrap',
  },
  button: {
    fontSize: 15,
    padding: theme.spacing(1, 1, 0.5),
    margin: theme.spacing(0.5)
  },
  delete: {
    backgroundColor: theme.custom.palette.red
  }
}));

const NFTGoodItem = ({
  item,
  onDetail,
  onPrice,
  onQuantity,
  onDelete
}) => {
  const classes = useStyles();

  return (
    <div className={classes.itemContainer}>
      <div
        className={classes.content}
        onClick={() => onDetail(item)}
      >
        <div>
          <img
            alt='good-nft'
            src={item.description || IMAGE_PLACEHOLDER_IMAGE_PATH}
            className={classes.image}
          />
        </div>
        <div className={classes.info}>
          <Typography
            variant='h5'
            color='textPrimary'
            className={classes.name}
          >
            {item.name}
          </Typography>
          <Typography color='primary'>
            {`Price: ${item.priceNQT / NQT_WEIGHT} JUP, Quantity: ${item.quantity}`}
          </Typography>
        </div>
      </div>
      <div className={classes.actionContainer}>
        <ContainedButton
          className={classes.button}
          onClick={() => onPrice(item)}
        >
          Price
        </ContainedButton>
        <ContainedButton
          className={classes.button}
          onClick={() => onQuantity(item)}
        >
          Quantity
        </ContainedButton>
        <ContainedButton
          className={clsx(classes.button, classes.delete)}
          onClick={() => onDelete(item)}
        >
          Delete
        </ContainedButton>
      </div>
    </div>
  )
}

export default memo(NFTGoodItem)
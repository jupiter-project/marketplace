
import { memo, useMemo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import ProductContent from 'parts/ProductContent'
import getJSONParse from 'utils/helpers/getJSONParse'

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    display: 'flex',
    width: '100%',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    },
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: theme.spacing(1),
    borderRadius: 2,
    border: `1px solid ${theme.custom.palette.border}`,
    backgroundColor: theme.palette.background.default,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  image: {
    width: 90,
    height: 90,
    objectFit: 'cover',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
}));

const AssetItem = ({
  item,
  onDetail,
  onSell
}) => {
  const classes = useStyles();

  const info = useMemo(() => getJSONParse(item?.message), [item]);

  return (
    <div className={classes.itemContainer}>
      <div className={classes.imageContainer} onClick={() => onDetail(item)}>
        <ProductContent
          info={info}
          className={classes.image}
        />
      </div>
      <div className={classes.content}>
        <Typography
          color='textPrimary'
          className={classes.name}
        >
          {item.description}
        </Typography>
        {
          item.unconfirmedQuantityQNT > 0 &&
          <ContainedButton onClick={() => onSell(item)}>
            Sell
          </ContainedButton>
        }
      </div>
    </div>
  )
}

export default memo(AssetItem)
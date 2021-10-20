
import { memo, useMemo } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import OutlinedButton from 'components/UI/Buttons/OutlinedButton'
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
  },
  delete: {
    borderColor: theme.custom.palette.red,
    backgroundColor: theme.custom.palette.red,
  },
}));

const AssetItem = ({
  item,
  onDetail,
  onSell,
  onSend,
  onDelete
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ContainedButton onClick={() => onSell(item)}>
                Sell
              </ContainedButton>
            </Grid>
            <Grid item xs={6}>
              <OutlinedButton onClick={() => onSend(item)}>
                Transfer
              </OutlinedButton>
            </Grid>
            <Grid item xs={6}>
              <ContainedButton
                className={classes.delete}
                onClick={() => onDelete(item)}
              >
                Delete
              </ContainedButton>
            </Grid>
          </Grid>
        }
      </div>
    </div>
  )
}

export default memo(AssetItem)
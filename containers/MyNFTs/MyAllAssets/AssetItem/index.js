
import { memo, useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import { IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';
import { FILE_TYPES } from 'utils/constants/file-types';

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
  refund: {
    fontSize: 15,
    padding: theme.spacing(1, 1, 0.5),
  }
}));

const AssetItem = ({
  item,
  onRefund
}) => {
  const classes = useStyles();
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (item.name === 'nftleda') {
      getAssetInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAssetInfo = async () => {
    const { attachment: { message = {} } = {} } = await jupiterAPI.getTransaction(item.asset);
    setInfo(JSON.parse(message))
  }

  return (
    <div className={classes.itemContainer}>
      <div className={classes.content}>
        {item.name === 'nftleda'
          ? (
            <>
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
                  variant='h5'
                  color='textPrimary'
                  className={classes.name}
                >
                  {item.description}
                </Typography>
                <Typography color='primary'>
                  {info?.description || ''}
                </Typography>
              </div>
            </>
          ) : (
            <>
              <img
                alt='good-nft'
                src={IMAGE_PLACEHOLDER_IMAGE_PATH}
                className={classes.image}
              />
              <div className={classes.info}>
                <Typography
                  variant='h5'
                  color='textPrimary'
                  className={classes.name}
                >
                  {item.name}
                </Typography>
                <Typography color='primary'>
                  Not NFT Assets.
                </Typography>
              </div>
            </>
          )
        }
      </div>
      {
        false && item.name === 'nftleda' &&
        <ContainedButton
          className={classes.refund}
          onClick={() => onRefund(item)}
        >
          Refund
        </ContainedButton>
      }
    </div>
  )
}

export default memo(AssetItem)
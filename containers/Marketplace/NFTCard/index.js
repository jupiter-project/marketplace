import { memo, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import MagicIdenticon from 'components/MagicIdenticon'
import NFTDropMenu from 'parts/NFTDropMenu'
import usePopUp from 'utils/hooks/usePopUp'
import LINKS from 'utils/constants/links'
import { NQT_WEIGHT } from 'utils/constants/common'
import { DEFAULT_IMAGE } from 'utils/constants/image-paths'
import MESSAGES from 'utils/constants/messages'
import { FILE_TYPES } from 'utils/constants/file-types';
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import getJSONParse from 'utils/helpers/getJSONParse'
import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    '&:hover': {
      transform: 'translateY(-5px)',
      transition: `ease-out 0.4s `,
      opacity: '100%'
    },
  },
  imageContainer: {
    position: 'relative',
    margin: -theme.spacing(2),
    marginBottom: 0,
    height: 180,
  },
  image: {
    height: 180,
    width: '100%',
    objectFit: 'cover'
  },
  quantityContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    minWidth: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 2px 12px 0 ${theme.palette.primary.main}`,
  },
  quantity: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.custom.palette.white,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: theme.spacing(0.5)
  },
  description: {
    WebkitLineClamp: 1
  },
  price: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 15,
    padding: theme.spacing(1, 1, 0.5),
    marginTop: theme.spacing(1)
  }
}));

const NFTCard = ({
  item,
  onPurchase
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const router = useRouter();
  const { setPopUp } = usePopUp();
  const { accountRS } = useSelector(state => state.auth);

  const assetInfo = useMemo(() => getJSONParse(item.message), [item]);

  const detailNFTHandler = useCallback(() => {
    router.push(
      LINKS.NFT_DETAIL.HREF,
      LINKS.NFT_DETAIL.HREF.replace('[goods]', item.goods)
    )
  }, [item, router])

  const purchaseHandler = useCallback(() => {
    if (!accountRS) {
      setPopUp({ text: MESSAGES.AUTH_REQUIRED })
      router.push(LINKS.SIGN_IN.HREF)
      return;
    }
    onPurchase(item)
  }, [item, accountRS, router, setPopUp, onPurchase])

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<MagicIdenticon size={40} value={item.accountRS} />}
        action={<NFTDropMenu />}
      />
      <CardContent>
        <div className={classes.imageContainer} onClick={detailNFTHandler}>
          {assetInfo.type === FILE_TYPES.IMAGE.VALUE
            ? (
              <img
                alt='image'
                src={assetInfo.image || DEFAULT_IMAGE}
                className={classes.image}
              />
            ) : (
              <video autoPlay loop controls className={classes.image}>
                <source src={assetInfo.image} />
              </video>
            )
          }
          {item.quantityQNT &&
            <div className={classes.quantityContainer}>
              <Typography
                variant='body2'
                className={classes.quantity}
              >
                {item.quantityQNT}
              </Typography>
            </div>
          }
        </div>
        <Typography
          variant='body1'
          color='textPrimary'
          className={classes.name}
        >
          {item.description}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          className={clsx(classes.description, commonClasses.breakWords)}
        >
          {assetInfo.description}
        </Typography>
        <div className={classes.buttonContainer}>
          <Typography
            variant='body2'
            color='primary'
            className={classes.price}
          >
            {item.priceNQT / NQT_WEIGHT} JUP
          </Typography>

          {accountRS === item.sellerRS
            ? (
              <ContainedButton
                className={classes.button}
                onClick={detailNFTHandler}
              >
                Edit
              </ContainedButton>
            ) : (
              <ContainedButton
                className={classes.button}
                onClick={purchaseHandler}
              >
                Purchase
              </ContainedButton>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(NFTCard)
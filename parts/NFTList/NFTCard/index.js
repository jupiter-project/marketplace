import { memo, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import ProductContent from 'parts/ProductContent'
import usePopUp from 'utils/hooks/usePopUp'
import LINKS from 'utils/constants/links'
import { NQT_WEIGHT } from 'utils/constants/common'
import MESSAGES from 'utils/constants/messages'
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
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 434,
  },
  imageContainer: {
    width: '100%',
    padding: theme.spacing(1),
    borderRadius: 2,
    border: `1px solid ${theme.custom.palette.border}`,
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(1)
  },
  image: {
    height: 270,
    width: '100%',
    objectFit: 'contain',
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 1
  },
  name: {
    fontSize: 14,
    marginBottom: theme.spacing(1)
  },
  description: {
    fontSize: 14,
    WebkitLineClamp: 2,
    marginBottom: theme.spacing(1)
  },
  price: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    '& span': {
      color: theme.palette.text.secondary,
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const NFTCard = ({
  item,
  onPurchase,
  onBid
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
      LINKS.NFT_DETAIL.HREF.replace('[goods]', item.asset)
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

  const bidHandler = useCallback(() => {
    if (!accountRS) {
      setPopUp({ text: MESSAGES.AUTH_REQUIRED })
      router.push(LINKS.SIGN_IN.HREF)
      return;
    }
    onBid(item)
  }, [item, accountRS, router, setPopUp, onBid])

  return (
    <div className={classes.card}>
      <div className={classes.infoContainer} onClick={detailNFTHandler}>
        <div className={classes.imageContainer}>
          <ProductContent
            info={assetInfo}
            className={classes.image}
          />
        </div>
        <Typography
          color='textPrimary'
          className={classes.title}
        >
          {item.description}
        </Typography>
        <Typography
          color='textSecondary'
          className={classes.name}
        >
          {item.accountRS}
        </Typography>
        <Typography
          color='textSecondary'
          className={clsx(classes.description, commonClasses.breakWords)}
        >
          {assetInfo.description}
        </Typography>
        <Typography
          variant='body2'
          color='primary'
          className={classes.price}
        >
          PRICE: <span>{item.priceNQT / NQT_WEIGHT} JUP</span>
        </Typography>
      </div>

      <div className={classes.buttonContainer}>
        <ContainedButton onClick={bidHandler}>
          Place a bid
        </ContainedButton>
        {accountRS === item.accountRS
          ? (
            <ContainedButton onClick={detailNFTHandler}>
              Edit NFT
            </ContainedButton>
          ) : (
            <ContainedButton onClick={purchaseHandler}>
              Buy now
            </ContainedButton>
          )
        }
      </div>
    </div>
  );
}

export default memo(NFTCard)
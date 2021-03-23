import { memo } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import MagicIdenticon from 'components/MagicIdenticon'
import LinkButton from 'components/UI/Buttons/LinkButton'
import NFTDropMenu from 'parts/NFTDropMenu'
import {
  NQT_WEIGHT,
  DEFAULT_IMAGE
} from 'utils/constants/common'
import LINKS from 'utils/constants/links'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
  },
  media: {
    height: 0,
    paddingTop: '80%',
    cursor: 'pointer',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5)
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(0.5)
  },
  price: {
    marginRight: theme.spacing(1)
  },
  button: {
    fontSize: 16,
    textAlign: 'right',
    paddingTop: theme.spacing(1),
  }
}));

const NFTCard = ({
  item,
  onPurchase
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { setPopUp } = usePopUp();

  const { accountRS } = useSelector(state => state.auth);

  const detailNFTHandler = () => {
    router.push(
      LINKS.NFT_DETAIL.HREF,
      LINKS.NFT_DETAIL.HREF.replace('[goods]', item.goods)
    )
  }

  const purchaseHandler = () => {
    if (!accountRS) {
      setPopUp({ text: MESSAGES.AUTH_REQUIRED })
      router.push(LINKS.SIGN_IN.HREF)
      return;
    }

    onPurchase(item)
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<MagicIdenticon size={40} value={item.sellerRS} />}
        action={<NFTDropMenu />}
      />

      <CardMedia
        className={classes.media}
        image={item.description || DEFAULT_IMAGE}
        title={item.name}
        onClick={detailNFTHandler}
      />

      <CardContent>
        <Typography variant='body1' color='textPrimary' className={classes.name}>
          {item.name}
        </Typography>
        <div className={classes.info}>
          <Typography variant='body2' color='primary' className={classes.price}>
            {item.priceNQT / NQT_WEIGHT} JUP
          </Typography>
          <Typography variant='body2' color='primary'>
            {`${item.quantity} of ${item.quantity}`}
          </Typography>
        </div>

        {accountRS === item.sellerRS
          ? (
            <LinkButton
              className={classes.button}
              onClick={detailNFTHandler}
            >
              Edit Now
            </LinkButton>
          ) : (
            <LinkButton
              className={classes.button}
              onClick={purchaseHandler}
            >
              Purchase Now
            </LinkButton>
          )
        }
      </CardContent>
    </Card>
  );
}

export default memo(NFTCard)
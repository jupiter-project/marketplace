import { memo } from 'react'
import { useRouter } from 'next/router'
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

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '80%',
    cursor: 'pointer'
  },
  highestBid: {
    display: 'flex',
    alignItems: 'center'
  },
  highestButton: {
    marginLeft: theme.spacing(1)
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
  }
}));

const NFTCard = ({
  item
}) => {
  const classes = useStyles();
  const router = useRouter();

  const detailNFTHandler = () => {
    // router.push(
    //   LINKS.NFT_DETAIL.HREF,
    //   LINKS.NFT_DETAIL.HREF.replace('[goods]', item.goods)
    // )
  }

  return (
    <Card>
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

        <LinkButton>
          Purchase Now
        </LinkButton>
      </CardContent>
    </Card>
  );
}

export default memo(NFTCard)
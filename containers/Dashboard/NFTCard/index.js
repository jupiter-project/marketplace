import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core'

import MagicIdenticon from 'components/MagicIdenticon'
import LinkButton from 'components/UI/Buttons/LinkButton'
import CardDropMenu from './CardDropMenu'
import {
  NQT_WEIGHT,
  DEFAULT_IMAGE
} from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '80%'
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

  return (
    <Card>
      <CardHeader
        avatar={
          <MagicIdenticon
            size={40}
            value={item.sellerRS}
          />
        }
        action={<CardDropMenu />}
      />

      <CardMedia
        className={classes.media}
        image={item.description || DEFAULT_IMAGE}
        title={item.name}
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
            {item.quantity}
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
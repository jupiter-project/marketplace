import { memo, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import DeleteNFTDialog from 'parts/DeleteNFTDialog'
import PurchaseNFTDialog from 'parts/PurchaseNFTDialog'
import InformationContent from './InformationContent'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
  },
  button: {
    fontSize: 15,
    borderRadius: 2,
    padding: theme.spacing(0.25, 1.5, 0),
  },
  delete: {
    backgroundColor: theme.custom.palette.red
  }
}));

const NFTInformation = ({
  isMine,
  good,
  account,
  assetInfo
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { setPopUp } = usePopUp();

  const { accountRS } = useSelector(state => state.auth);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);

  const purchaseHandler = useCallback(() => {
    if (!accountRS) {
      setPopUp({ text: MESSAGES.AUTH_REQUIRED })
      router.push(LINKS.SIGN_IN.HREF)
      return;
    }

    setOpenPurchaseModal(true)
  }, [accountRS, router, setPopUp, setOpenPurchaseModal])

  return (
    <div className={classes.root}>
      <InformationContent
        good={good}
        account={account}
        assetInfo={assetInfo}
      />
      {isMine
        ? (
          <ContainedButton
            className={clsx(classes.button, classes.delete)}
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete
          </ContainedButton>
        ) : (
          <ContainedButton
            className={classes.button}
            onClick={purchaseHandler}
          >
            Buy Now
          </ContainedButton>
        )
      }

      {openPurchaseModal &&
        <PurchaseNFTDialog
          open={openPurchaseModal}
          setOpen={setOpenPurchaseModal}
          item={good}
        />
      }
      {openDeleteModal &&
        <DeleteNFTDialog
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          item={good}
        />
      }
    </div>
  )
}

export default memo(NFTInformation)
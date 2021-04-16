import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import DeleteNFTDialog from 'parts/DeleteNFTDialog'
import PurchaseNFTDialog from 'parts/PurchaseNFTDialog'
import InformationContent from './InformationContent'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    minWidth: 'unset'
  },
  delete: {
    backgroundColor: theme.custom.palette.red
  }
}));

const NFTInformation = ({
  good,
  assetInfo
}) => {
  const classes = useStyles();
  const { accountRS } = useSelector(state => state.auth);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);

  return (
    <div>
      <InformationContent
        good={good}
        assetInfo={assetInfo}
      />
      {accountRS !== good.accountRS
        ? (
          <ContainedButton
            className={classes.button}
            onClick={() => setOpenPurchaseModal(true)}
          >
            Purchase Now
          </ContainedButton>
        ) : (
          <ContainedButton
            className={clsx(classes.button, classes.delete)}
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete
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
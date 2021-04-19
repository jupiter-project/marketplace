import { memo, useState } from 'react'
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
  isMine,
  good,
  assetInfo
}) => {
  const classes = useStyles();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);

  return (
    <div>
      <InformationContent
        good={good}
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
            onClick={() => setOpenPurchaseModal(true)}
          >
            Purchase
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
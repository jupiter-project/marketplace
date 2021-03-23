import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import DeleteNFTDialog from 'parts/DeleteNFTDialog'
import PurchaseNFTDialog from 'parts/PurchaseNFTDialog'
import PriceNFTDialog from 'parts/PriceNFTDialog'
import QuantityNFTDialog from 'parts/QuantityNFTDialog'
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
  good
}) => {
  const classes = useStyles();
  const { accountRS } = useSelector(state => state.auth);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
  const [openPriceModal, setOpenPriceModal] = useState(false);
  const [openQuantityModal, setOpenQuantityModal] = useState(false);

  return (
    <div>
      <InformationContent good={good} />
      {accountRS !== good.sellerRS
        ? (
          <ContainedButton
            className={classes.button}
            onClick={() => setOpenPurchaseModal(true)}
          >
            Purchase Now
          </ContainedButton>
        ) : (
          <div className={classes.buttonContainer}>
            <ContainedButton
              className={classes.button}
              onClick={() => setOpenPriceModal(true)}
            >
              Price
            </ContainedButton>
            <ContainedButton
              className={classes.button}
              onClick={() => setOpenQuantityModal(true)}
            >
              Quantity
            </ContainedButton>
            <ContainedButton
              className={clsx(classes.button, classes.delete)}
              onClick={() => setOpenDeleteModal(true)}
            >
              Delete
            </ContainedButton>
          </div>
        )
      }

      {openPurchaseModal &&
        <PurchaseNFTDialog
          open={openPurchaseModal}
          setOpen={setOpenPurchaseModal}
          item={good}
        />
      }

      {openPriceModal &&
        <PriceNFTDialog
          open={openPriceModal}
          setOpen={setOpenPriceModal}
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

      {openQuantityModal &&
        <QuantityNFTDialog
          open={openQuantityModal}
          setOpen={setOpenQuantityModal}
          item={good}
        />
      }
    </div>
  )
}

export default memo(NFTInformation)
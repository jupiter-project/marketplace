
import { memo, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import RefundNFTDialog from 'parts/RefundNFTDialog'
import TabPanel from '../Shared/TabPanel'
import NoNFT from '../Shared/NoNFT'
import NFTSaleItem from './NFTSaleItem'
import { isEmpty } from 'utils/helpers/utility'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const PAGE_COUNT = 8;

const CompletedSalesNFT = ({
  index,
  value
}) => {
  const classes = useStyles();
  const { setPopUp } = usePopUp();

  const { currentUser } = useSelector(state => state.auth);
  const [purchases, setPurchases] = useState([])
  const [first, setFirst] = useState(0);
  const [isLast, setIsLast] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      getDGSPurchasesBySeller();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const getDGSPurchasesBySeller = useCallback(async () => {
    if (!isLast) {
      const params = {
        first,
        last: first + PAGE_COUNT - 1,
        seller: currentUser.account
      }

      const response = await jupiterAPI.getDGSPurchasesBySeller(params);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.GET_NFT_ERROR })
        return;
      }

      const { purchases = [] } = response;
      setPurchases((prev) => [...prev, ...purchases]);
      setFirst((prev) => prev + purchases.length);
      setIsLast(purchases.length < PAGE_COUNT);
    }
  }, [isLast, first, currentUser, setPurchases, setFirst, setIsLast, setPopUp])

  const refundHandler = useCallback((item) => {
    setSelectedItem(item)
    setOpenModal(true)
  }, [setOpenModal, setSelectedItem])

  return (
    <TabPanel value={value} index={index}>
      {isEmpty(purchases)
        ? (
          <NoNFT />
        ) : (
          <div className={classes.container}>
            {purchases.map((item) => (
              <NFTSaleItem
                key={item.purchase}
                item={item}
                onRefund={refundHandler}
              />
            ))}
            {
              !isLast &&
              <ContainedButton
                onClick={getDGSPurchasesBySeller}
                className={classes.loadButton}
              >
                Load More
              </ContainedButton>
            }
          </div>
        )
      }
      {
        openModal &&
        <RefundNFTDialog
          item={selectedItem}
          open={openModal}
          setOpen={setOpenModal}
        />
      }
    </TabPanel>
  )
}

export default memo(CompletedSalesNFT)
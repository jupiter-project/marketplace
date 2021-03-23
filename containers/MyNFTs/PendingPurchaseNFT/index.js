
import { memo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import * as jupiterAPI from 'services/api-jupiter'
import DeliveryNFTDialog from 'parts/DeliveryNFTDialog'
import TabPanel from '../Shared/TabPanel'
import NoNFT from '../Shared/NoNFT'
import NFTPurchaseItem from './NFTPurchaseItem'
import { isEmpty } from 'utils/helpers/utility'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'

const PendingPurchaseNFT = ({
  index,
  value
}) => {
  const { setPopUp } = usePopUp();

  const { currentUser } = useSelector(state => state.auth);
  const [pendingPurchases, setPendingPurchases] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  useEffect(() => {
    const getDGSPendingPurchases = async () => {
      const response = await jupiterAPI.getDGSPendingPurchases(currentUser.account);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.GET_NFT_ERROR })
        return;
      }

      setPendingPurchases(response.purchases)
    }

    if (!isEmpty(currentUser)) {
      getDGSPendingPurchases();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const approveDeliverHandler = (item) => {
    setSelectedItem(item)
    setOpenModal(true)
  }

  return (
    <TabPanel value={value} index={index}>
      {isEmpty(pendingPurchases)
        ? (
          <NoNFT />
        ) : (
          pendingPurchases.map((item) => (
            <NFTPurchaseItem
              key={item.goods}
              item={item}
              onApprove={approveDeliverHandler}
            />
          ))
        )
      }
      {
        openModal &&
        <DeliveryNFTDialog
          item={selectedItem}
          open={openModal}
          setOpen={setOpenModal}
        />
      }
    </TabPanel>
  )
}

export default memo(PendingPurchaseNFT)
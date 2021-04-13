
import { memo, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import NoNFT from 'parts/NoNFT'
import RefundNFTDialog from 'parts/RefundNFTDialog'
import TabPanel from '../Shared/TabPanel'
import AssetItem from './AssetItem'
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

const PAGE_COUNT = 5;
const MyAllAssets = ({
  index,
  value
}) => {
  const classes = useStyles();
  const { setPopUp } = usePopUp();

  const { currentUser } = useSelector(state => state.auth);
  const [assets, setAssets] = useState([])
  const [first, setFirst] = useState(0);
  const [isLast, setIsLast] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      getAssetsBySeller();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const getAssetsBySeller = useCallback(async () => {
    if (!isLast) {
      const params = {
        first,
        last: first + PAGE_COUNT - 1,
        account: currentUser.account
      }

      const response = await jupiterAPI.getAssetsBySeller(params);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.GET_NFT_ERROR })
        return;
      }

      const { assets = [] } = response;
      setAssets((prev) => [...prev, ...assets[0]]);
      setFirst((prev) => prev + assets[0].length);
      setIsLast(assets[0].length < PAGE_COUNT);
    }
  }, [isLast, first, currentUser, setAssets, setFirst, setIsLast, setPopUp])

  const refundHandler = useCallback((item) => {
    setSelectedItem(item)
    setOpenModal(true)
  }, [setOpenModal, setSelectedItem])

  return (
    <TabPanel value={value} index={index}>
      {isEmpty(assets)
        ? (
          <NoNFT />
        ) : (
          <div className={classes.container}>
            {assets.map((item) => (
              <AssetItem
                key={item.asset}
                item={item}
                onRefund={refundHandler}
              />
            ))}
            {
              !isLast &&
              <ContainedButton
                onClick={getAssetsBySeller}
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

export default memo(MyAllAssets)
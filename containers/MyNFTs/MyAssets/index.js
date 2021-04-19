
import { memo, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import NoData from 'parts/NoData'
import SellAssetDialog from 'parts/SellAssetDialog'
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
const MyAssets = ({
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
      getAccountAssets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const getAccountAssets = useCallback(async () => {
    if (!isLast) {
      const params = {
        first,
        last: first + PAGE_COUNT - 1,
        account: currentUser.account
      }

      const response = await jupiterAPI.searchAccountAssets(params);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.GET_NFT_ERROR })
        return;
      }

      const { accountAssets = [] } = response;
      setAssets((prev) => [...prev, ...accountAssets]);
      setFirst((prev) => prev + accountAssets.length);
      setIsLast(accountAssets.length < PAGE_COUNT);
    }
  }, [isLast, first, currentUser, setAssets, setFirst, setIsLast, setPopUp])

  const sellHandler = useCallback((item) => {
    setSelectedItem(item)
    setOpenModal(true)
  }, [setOpenModal, setSelectedItem])

  return (
    <TabPanel value={value} index={index}>
      {isEmpty(assets)
        ? (
          <NoData />
        ) : (
          <div className={classes.container}>
            {assets.map((item, index) => (
              <AssetItem
                key={index}
                item={item}
                onSell={sellHandler}
              />
            ))}
            {
              !isLast &&
              <ContainedButton
                onClick={getAccountAssets}
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
        <SellAssetDialog
          item={selectedItem}
          open={openModal}
          setOpen={setOpenModal}
        />
      }
    </TabPanel>
  )
}

export default memo(MyAssets)
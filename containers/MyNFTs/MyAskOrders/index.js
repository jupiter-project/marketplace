
import { memo, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import NoNFT from 'parts/NoNFT'
import DeleteNFTDialog from 'parts/DeleteNFTDialog'
import TabPanel from '../Shared/TabPanel'
import OrderItem from './OrderItem'
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
const MyAskOrders = ({
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
      getAccountCurrentAskOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const getAccountCurrentAskOrders = useCallback(async () => {
    if (!isLast) {
      const params = {
        first,
        last: first + PAGE_COUNT - 1,
        account: currentUser.account
      }

      const response = await jupiterAPI.getAccountCurrentAskOrders(params);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.GET_NFT_ERROR })
        return;
      }

      const { askOrders = [] } = response;
      setAssets((prev) => [...prev, ...askOrders]);
      setFirst((prev) => prev + askOrders.length);
      setIsLast(askOrders.length < PAGE_COUNT);
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
          <NoNFT />
        ) : (
          <div className={classes.container}>
            {assets.map((item, index) => (
              <OrderItem
                key={index}
                item={item}
                onDelete={sellHandler}
              />
            ))}
            {
              !isLast &&
              <ContainedButton
                onClick={getAccountCurrentAskOrders}
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
        <DeleteNFTDialog
          item={selectedItem}
          open={openModal}
          setOpen={setOpenModal}
        />
      }
    </TabPanel>
  )
}

export default memo(MyAskOrders)
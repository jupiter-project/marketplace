
import { memo, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import NoNFT from 'parts/NoNFT'
import DeleteNFTDialog from 'parts/DeleteNFTDialog'
import PriceNFTDialog from 'parts/PriceNFTDialog'
import QuantityNFTDialog from 'parts/QuantityNFTDialog'
import TabPanel from '../Shared/TabPanel'
import NFTGoodItem from './NFTGoodItem'
import { isEmpty } from 'utils/helpers/utility'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const PAGE_COUNT = 8;

const NFTGoods = ({
  index,
  value
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { setPopUp } = usePopUp();

  const { currentUser } = useSelector(state => state.auth);
  const [goods, setGoods] = useState([])
  const [first, setFirst] = useState(0);
  const [isLast, setIsLast] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPriceModal, setOpenPriceModal] = useState(false);
  const [openQuantityModal, setOpenQuantityModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      getDGSGoodsBySeller();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const getDGSGoodsBySeller = useCallback(async () => {
    if (!isLast) {
      const params = {
        first,
        last: first + PAGE_COUNT - 1,
      }

      const response = await jupiterAPI.getDGSGoods(params, currentUser.account);
      if (response?.errorCode) {
        setPopUp({ text: MESSAGES.GET_NFT_ERROR })
        return;
      }
      const { goods = [] } = response;
      setGoods((prev) => [...prev, ...goods]);
      setFirst((prev) => prev + goods.length);
      setIsLast(goods.length < PAGE_COUNT);
    }
  }, [isLast, first, currentUser, setGoods, setFirst, setIsLast, setPopUp]);

  const detailNFTHandler = useCallback((item) => {
    router.push(
      LINKS.NFT_DETAIL.HREF,
      LINKS.NFT_DETAIL.HREF.replace('[goods]', item.goods)
    )
  }, [router]);

  const priceHandler = useCallback((item) => {
    setSelectedItem(item)
    setOpenPriceModal(true)
  }, [setSelectedItem, setOpenPriceModal]);

  const quantityHandler = useCallback((item) => {
    setSelectedItem(item)
    setOpenQuantityModal(true)
  }, [setSelectedItem, setOpenQuantityModal]);

  const deleteHandler = useCallback((item) => {
    setSelectedItem(item)
    setOpenDeleteModal(true)
  }, [setSelectedItem, setOpenDeleteModal]);

  return (
    <TabPanel value={value} index={index}>
      {isEmpty(goods)
        ? (
          <NoNFT />
        ) : (
          <div className={classes.container}>
            {goods.map((item) => (
              <NFTGoodItem
                key={item.goods}
                item={item}
                onDetail={detailNFTHandler}
                onPrice={priceHandler}
                onQuantity={quantityHandler}
                onDelete={deleteHandler}
              />
            ))}
            {
              !isLast &&
              <ContainedButton
                onClick={getDGSGoodsBySeller}
                className={classes.loadButton}
              >
                Load More
              </ContainedButton>
            }
          </div>
        )
      }
      {openPriceModal &&
        <PriceNFTDialog
          open={openPriceModal}
          setOpen={setOpenPriceModal}
          item={selectedItem}
        />
      }

      {openDeleteModal &&
        <DeleteNFTDialog
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          item={selectedItem}
        />
      }

      {openQuantityModal &&
        <QuantityNFTDialog
          open={openQuantityModal}
          setOpen={setOpenQuantityModal}
          item={selectedItem}
        />
      }
    </TabPanel>
  )
}

export default memo(NFTGoods)
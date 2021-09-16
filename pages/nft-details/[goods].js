
import NFTDetail from 'containers/NFTDetail'
import Layout from 'Layout'
import * as jupiterAPI from 'services/api-jupiter'
import { isEmpty } from 'utils/helpers/utility'

export default function NFTDetailPage(props) {
  return (
    <Layout>
      <NFTDetail {...props} />
    </Layout>
  )
}

NFTDetailPage.getInitialProps = async ({ query }) => {
  try {
    const [
      transactionResponse,
      assetAccountsResponse,
      askOrdersResponse
    ] = await Promise.all([
      jupiterAPI.getTransaction(query.goods),
      jupiterAPI.getAssetAccounts(query.goods),
      jupiterAPI.getAskOrders(query.goods),
    ]);
    const { senderRS, attachment = {}, timestamp } = transactionResponse
    const { accountAssets = [] } = assetAccountsResponse
    const { askOrders = [] } = askOrdersResponse

    let good = {
      ...attachment,
      asset: query.goods,
      creatorRS: senderRS,
      accountRS: accountAssets[0].accountRS,
      priceNQT: 0,
      timestamp
    }

    let askOrder = {}
    if (!isEmpty(askOrders)) {
      askOrder = askOrders[0]
      const { priceNQT, order, type } = askOrder;
      good = {
        ...good,
        order,
        type,
        priceNQT
      }
    }

    return {
      good,
      order: askOrder,
    }
  } catch (error) {
    console.log(error)
  }
}

import MAIN_ERC_ABI from 'libs/abis/main/erc.json'
import TEST_ERC_ABI from 'libs/abis/test/erc.json'
import MAIN_BEP_ABI from 'libs/abis/main/bep.json'
import TEST_BEP_ABI from 'libs/abis/test/bep.json'

import { IS_MAINNET } from 'config'

const ERC_ABI = IS_MAINNET ? MAIN_ERC_ABI : TEST_ERC_ABI
const BEP_ABI = IS_MAINNET ? MAIN_BEP_ABI : TEST_BEP_ABI

export {
    ERC_ABI,
    BEP_ABI
}
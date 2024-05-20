import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import { getTransactionsBySenderEtherscan } from './scripts/getTransactionsBySenderEtherscan'
import { FinalReport } from './scripts/models/FinalReport'
import { getGasSpent } from './scripts/getGasSpent'
import { getExecutionTimestamp } from './scripts/getExecutionTimestamp'
import { getEthDistributed } from './scripts/getEthDistributed'
import { getTotal_ETH_distributed } from './scripts/getTotal_ETH_distributed'

async function main() {
  logger.info('97-test started')

  const txs = await getTransactionsBySenderEtherscan()
  logger.info(txs.length, 'txs fetched from Etherscan')

  const successfulTxs = txs.filter(tx => tx.isError === '0' && tx.txreceipt_status === '1')
  logger.info(successfulTxs.length, 'successful txs fetched from Etherscan')

  const execution_timestamp = getExecutionTimestamp(successfulTxs)
  const gas_spent = getGasSpent(txs)
  const {
    total_ETH_client_part,
    total_ETH_P2P_part,
    total_ETH_referrer_part,
    total_ETH_distributed
  } = await getTotal_ETH_distributed(successfulTxs)

  const addresses_scanned: number = 0
  const fee_dividers_used: number = 0
  const new_fee_dividers_deployed: number = 0
  const legacy_divisions: number = 0

  const finalReport: FinalReport = {
    execution_timestamp,
    gas_spent,
    total_ETH_distributed,
    total_ETH_client_part,
    total_ETH_P2P_part,
    total_ETH_referrer_part,
    addresses_scanned,
    fee_dividers_used,
    new_fee_dividers_deployed,
    legacy_divisions
  }

  logger.info('97-test finished')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import { getTransactionsBySenderEtherscan } from './scripts/getTransactionsBySenderEtherscan'
import { FinalReport } from './scripts/models/FinalReport'
import { getGasSpent } from './scripts/getGasSpent'
import { getExecutionTimestamp } from './scripts/getExecutionTimestamp'
import { getEthDistributed } from './scripts/getEthDistributed'
import { iterateSuccessfulTxs } from './scripts/iterate_successful_txs'
import { getAllFeeRecipientsCount } from './scripts/getAllFeeRecipientsCount'

async function main() {
  logger.info('97-test started')

  const txs = await getTransactionsBySenderEtherscan()
  logger.info(txs.length, 'txs fetched from Etherscan')

  const successfulTxs = txs.filter(tx => tx.isError === '0' && tx.txreceipt_status === '1')
  logger.info(successfulTxs.length, 'successful txs fetched from Etherscan')

  const {start_execution_timestamp, end_execution_timestamp} = getExecutionTimestamp(successfulTxs)
  const gas_spent = getGasSpent(txs)
  const {
    total_ETH_client_part,
    total_ETH_P2P_part,
    total_ETH_referrer_part,
    total_ETH_distributed,
    fee_dividers_used,
    new_fee_dividers_deployed
  } = await iterateSuccessfulTxs(successfulTxs)
  const addresses_scanned: number = await getAllFeeRecipientsCount()

  const legacy_divisions: number = 0

  const finalReport: FinalReport = {
    start_execution_timestamp,
    end_execution_timestamp,
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

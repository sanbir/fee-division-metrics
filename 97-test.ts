import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import { getTransactionsBySenderEtherscan } from './scripts/getTransactionsBySenderEtherscan'
import { FinalReport } from './scripts/models/FinalReport'
import { getGasSpent } from './scripts/getGasSpent'
import { getExecutionTimestamp } from './scripts/getExecutionTimestamp'
import { iterateSuccessfulTxs } from './scripts/iterate_successful_txs'
import { getAllFeeRecipientsCount } from './scripts/getAllFeeRecipientsCount'
import { getLegacyDivisions } from './scripts/getLegacyDivisions'

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
  const addresses_scanned = await getAllFeeRecipientsCount()
  const legacy_divisions = getLegacyDivisions(successfulTxs)

  const finalReport: FinalReport = {
    start_execution_timestamp,
    end_execution_timestamp,
    gas_spent,
    total_ETH_distributed,
    total_ETH_client_part,
    total_ETH_P2P_part,
    total_ETH_referrer_part,
    addresses_scanned: addresses_scanned.toString(),
    fee_dividers_used: fee_dividers_used.toString(),
    new_fee_dividers_deployed: new_fee_dividers_deployed.toString(),
    legacy_divisions: legacy_divisions.toString()
  }

  const jsonString = JSON.stringify(finalReport, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  )

  logger.log(jsonString)

  const keys = Object.keys(finalReport)
  for (const key of keys) {
    const response = await fetch('https://vmagent.dev-p2p.org/api/v1/import/prometheus', {
      method: 'POST',
      body: `eth_fee_divider_${key}{network="mainnet"} ${(finalReport as Record<string, any>)[key]} ${finalReport.start_execution_timestamp}`
    })
  }

  logger.info('97-test finished')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

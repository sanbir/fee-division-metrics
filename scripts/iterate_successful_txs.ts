import { getEthDistributed } from './getEthDistributed'
import { EtherScanTx } from './models/EtherScanTx'

export async function iterateSuccessfulTxs(successfulTxs: EtherScanTx[]) {
  let total_ETH_client_partInWei: bigint = 0n
  let total_ETH_P2P_partInWei: bigint = 0n
  let total_ETH_referrer_partInWei: bigint = 0n

  let fee_dividers_used: number = 0
  let new_fee_dividers_deployed: number = 0

  for (const tx of successfulTxs) {
    if (tx.functionName === 'withdraw(bytes32[] proof, uint256 amount)') {
      const ethDistributed = await getEthDistributed(tx.hash)
      if (ethDistributed) {
        total_ETH_client_partInWei += ethDistributed.client_partInWei
        total_ETH_P2P_partInWei += ethDistributed.P2P_partInWei
        total_ETH_referrer_partInWei += ethDistributed.referrer_partInWei

        fee_dividers_used++
      }
    } else if (tx.functionName === 'createFeeDistributor(address _referenceFeeDistributor,tuple _clientConfig,tuple _referrerConfig)') {
      new_fee_dividers_deployed++
    }
  }

  const total_ETH_client_part: string = (total_ETH_client_partInWei / 10n**18n).toString()
  const total_ETH_P2P_part: string = (total_ETH_P2P_partInWei / 10n**18n).toString()
  const total_ETH_referrer_part: string = (total_ETH_referrer_partInWei / 10n**18n).toString()
  const total_ETH_distributed: string = ((total_ETH_client_partInWei + total_ETH_P2P_partInWei + total_ETH_referrer_partInWei) / 10n**18n).toString()

  return {
    total_ETH_client_part,
    total_ETH_P2P_part,
    total_ETH_referrer_part,
    total_ETH_distributed,
    fee_dividers_used,
    new_fee_dividers_deployed
  }
}
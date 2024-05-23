import { EtherScanTx } from './models/EtherScanTx'
import { formatEther } from 'viem'

export function getGasSpent(txs: EtherScanTx[]) {
  let gas_spentInWei: bigint = 0n
  for (const tx of txs) {
    const gas_spentForTx = BigInt(tx.gasUsed) * BigInt(tx.gasPrice)
    gas_spentInWei += gas_spentForTx
  }
  const gas_spent: string = formatEther(gas_spentInWei)

  return gas_spent
}
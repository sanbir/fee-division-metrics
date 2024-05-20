import { EtherScanTx } from './models/EtherScanTx'

export function getGasSpent(txs: EtherScanTx[]) {
  let gas_spentInWei: bigint = 0n
  for (const tx of txs) {
    const gas_spentForTx = BigInt(tx.gasUsed) * BigInt(tx.gasPrice)
    gas_spentInWei += gas_spentForTx
  }
  const gas_spent: string = (gas_spentInWei / (10n ** 18n)).toString()

  return gas_spent
}
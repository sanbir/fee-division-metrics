import { EtherScanTx } from './models/EtherScanTx'

export function getLegacyDivisions(successfulTxs: EtherScanTx[]) {
  const reportTxs = successfulTxs.filter(tx => tx.functionName.includes('report'))
  if (reportTxs.length < 3) {
    console.error('< 3 reportTxs. Something changed')
  }

  const legacyDivisionTxs = successfulTxs
    .slice(successfulTxs.indexOf(reportTxs[1]))
    .filter(tx => tx.functionName === 'withdraw(bytes32[] proof, uint256 amount)')

  const legacy_divisions: number = legacyDivisionTxs.length

  return legacy_divisions
}
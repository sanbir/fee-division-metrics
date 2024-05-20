import { EtherScanTx } from './models/EtherScanTx'

export function getExecutionTimestamp(successfulTxs: EtherScanTx[]) {
  return successfulTxs[successfulTxs.length - 1].timeStamp
}
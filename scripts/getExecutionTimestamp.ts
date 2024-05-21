import { EtherScanTx } from './models/EtherScanTx'

export function getExecutionTimestamp(successfulTxs: EtherScanTx[]) {
  const start_execution_timestamp: string = successfulTxs[0].timeStamp
  const end_execution_timestamp: string = successfulTxs[successfulTxs.length - 1].timeStamp

  return {start_execution_timestamp, end_execution_timestamp}
}
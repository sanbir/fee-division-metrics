import { decodeEventLog } from 'viem';
import { publicClient } from './common/helpers/clients'
import { EthDistributed } from './models/EthDistributed'

export async function getEthDistributed(txHash: string) {
  const receipt = await publicClient.getTransactionReceipt({hash: txHash as `0x${string}`})
  const logs = receipt.logs

  for (const log of logs) {
    if (log.topics[0] === '0xd677f135315cde603d8fd2eb0a155980bf63fe7de2c4fd0c87107f6444aab7a1') { // V3
      const decodedLog = decodeEventLog({
        abi: V3_withdrawnEventABI,
        data: log.data,
        topics: log.topics
      })
      return decodedLog.args as unknown as EthDistributed
    } else if (log.topics[0] === '0xabd2ab552bc04cdbfa4a54107fa44ac8c9cb06f6d21da11933ac05a653be19e9') { // V2
      const decodedLog = decodeEventLog({
        abi: V2_withdrawnEventABI,
        data: log.data,
        topics: log.topics
      })
      return decodedLog.args as unknown as EthDistributed
    }
  }

  return undefined
}

const withdrawnEventAbiObject = {
  "anonymous": false,
  "inputs": [
    { "indexed": false, "internalType": "uint256", "name": "P2P_partInWei", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "client_partInWei", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "referrer_partInWei", "type": "uint256" }
  ],
  "name": "Withdrawn",
  "type": "event"
}

const V2_withdrawnEventABI = [withdrawnEventAbiObject]

const V3_withdrawnEventABI = [{
  ...withdrawnEventAbiObject,
  "name": "FeeDistributor__Withdrawn"
}]
